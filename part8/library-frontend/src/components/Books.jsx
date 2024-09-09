/* eslint-disable react/prop-types */
import { useState } from "react";

const Books = (props) => {
  const [filter, setFilter] = useState("none");

  if (!props.show || !props.books) {
    return null;
  }

  const books = props.books;
  const filteredBooks =
    filter === "none"
      ? books
      : books.filter((book) => book.genres.includes(filter));
  const genres = [
    ...new Set(
      books
        .map((book) => book.genres)
        .flat()
        .map((genre) => genre.toLowerCase())
    ),
  ];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setFilter(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setFilter("none")}>all</button>
    </div>
  );
};

export default Books;
