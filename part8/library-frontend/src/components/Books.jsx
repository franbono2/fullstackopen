/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { BOOKS_BY_GENRE } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const { loading, error, data } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
  });

  if (!props.show) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  const books = data.allBooks;
  const genres = [
    ...new Set(
      props.books
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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>all</button>
    </div>
  );
};

export default Books;
