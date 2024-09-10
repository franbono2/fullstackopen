import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, BOOKS_BY_GENRE } from "./queries";

export const updateCache = (cache, addedBook) => {
  window.alert("Book added successfully");
  const uniqByName = (b) => {
    let seen = new Set();
    return b.filter((book) => {
      let title = book.title;
      return seen.has(title) ? false : seen.add(title);
    });
  };
  const { allBooks } = cache.readQuery({
    query: BOOKS_BY_GENRE,
    variables: { genre: null },
  });
  cache.writeQuery({
    query: BOOKS_BY_GENRE,
    variables: { genre: null },
    data: { allBooks: uniqByName(allBooks.concat([addedBook])) },
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      updateCache(client.cache, addedBook);
    },
  });

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (authorsResult.loading || booksResult.loading) {
    return <div>loading...</div>;
  }

  if (!token) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Authors
        show={page === "authors"}
        authors={authorsResult.data.allAuthors}
      />

      <Books show={page === "books"} books={booksResult.data.allBooks} />

      <NewBook show={page === "add"} />

      <Recommendations
        show={page === "recommend"}
        books={booksResult.data.allBooks}
      />
    </div>
  );
};

export default App;
