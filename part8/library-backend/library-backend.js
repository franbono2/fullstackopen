const { startStandaloneServer } = require("@apollo/server/standalone");
const { ApolloServer } = require("@apollo/server");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book");
const Author = require("./models/author");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
const { GraphQLError } = require("graphql");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `#graphql
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

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
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root._id }),
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
        const newAuthor = new Author({ name: args.author });
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
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "GRAPHQL_VALIDATION_FAILED",
          },
        });
      }
      return book.populate("author", { name: 1, born: 1 });
    },
    editAuthor: async (_root, args) => {
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
