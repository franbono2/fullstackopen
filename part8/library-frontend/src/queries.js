import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query Query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query Query {
    allBooks {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`;

export const BOOKS_BY_GENRE = gql`
  query Query($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation Mutation(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`;

export const EDIT_BIRTHYEAR = gql`
  mutation Mutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const LOGGED_USER = gql`
  query Query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription Subscription {
    bookAdded {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`;
