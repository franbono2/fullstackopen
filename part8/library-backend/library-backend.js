const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book");
const Author = require("./models/author");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
const { GraphQLError } = require("graphql");

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
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

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
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
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root._id }),
  },
  Mutation: {
    addBook: async (_root, args) => {
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
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      await author.save();
      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
