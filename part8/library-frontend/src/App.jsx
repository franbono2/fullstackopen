import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { useApolloClient, useQuery } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, LOGGED_USER } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);
  const userResult = useQuery(LOGGED_USER);
  const client = useApolloClient();

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (authorsResult.loading || booksResult.loading || userResult.loading) {
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
        favoriteGenre={userResult.data.me.favoriteGenre}
      />
    </div>
  );
};

export default App;
