/* eslint-disable react/prop-types */
const Recommendations = (props) => {
  if (!props.show || !props.books || !props.favoriteGenre) {
    return null;
  }

  const books = props.books;
  const filteredBooks = books.filter((book) =>
    book.genres.includes(props.favoriteGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{props.favoriteGenre}</b>
      </p>
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
    </div>
  );
};

export default Recommendations;
