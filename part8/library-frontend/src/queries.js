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
      author
      published
    }
  }
`;
