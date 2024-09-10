const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_root, args) => {
      if (!args.author && !args.genre)
        return Book.find({}).populate("author", { name: 1, born: 1 });
      if (!args.genre) {
        const author = await Author.findOne({ name: args.author });
        console.log(author);
        return Book.find({ author: author._id }).populate("author", {
          name: 1,
          born: 1,
        });
      }
      if (!args.author) {
        return Book.find({ genres: { $all: [args.genre] } }).populate(
          "author",
          { name: 1, born: 1 }
        );
      }
      const author = await Author.findOne({ name: args.author });
      return Book.find({
        genres: { $all: [args.genre] },
        author: author.id,
      }).populate("author", { name: 1, born: 1 });
    },
    allAuthors: async () => Author.find({}),
    me: (_root, _args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (_root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({ name: args.author, bookCount: 0 });
        try {
          await newAuthor.save();
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: {
              code: "GRAPHQL_VALIDATION_FAILED",
            },
          });
        }
        author = await Author.findOne({ name: args.author });
      }
      const book = new Book({
        title: args.title,
        author: author._id,
        genres: args.genres,
        published: args.published,
      });
      author.bookCount = author.bookCount + 1;
      try {
        await author.save();
        await book.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "GRAPHQL_VALIDATION_FAILED",
          },
        });
      }
      const populatedBook = await book.populate("author", { name: 1, born: 1 });
      pubsub.publish("BOOK_ADDED", { bookAdded: populatedBook });
      return populatedBook;
    },
    editAuthor: async (_root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      await author.save();
      return author;
    },
    createUser: async (_root, args) => {
      const user = new User({ ...args });
      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      }
      return user;
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userToken = {
        username: user.username,
        id: user._id,
      };
      return {
        value: jwt.sign(userToken, process.env.JWT_SECRET),
      };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
