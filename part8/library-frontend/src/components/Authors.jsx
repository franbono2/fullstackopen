import BirthForm from "./BirthForm";

/* eslint-disable react/prop-types */
const Authors = (props) => {
  if (!props.show || !props.authors) {
    return null;
  }
  const authors = props.authors;
  const authorNames = authors.map((a) => a.name);

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthForm authorNames={authorNames} />
    </div>
  );
};

export default Authors;
