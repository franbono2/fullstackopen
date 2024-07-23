const Persons = ({ personsToShow, onClick }) => {

  return (
    <>
    {
      personsToShow.map(person => 
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => onClick(person.id)}>delete</button>
        </p>
      )
    }
    </>
  )
}

export default Persons