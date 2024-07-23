const Course = ({ course }) => {

  const totalNumExercises = () => {
    const initialValue = 0
    const total = course.parts.reduce((accumulator, current) => accumulator + current.exercises, initialValue)
    return total
  }

  return (
    <article>
      <header>
        <h1>{course.name}</h1>
      </header>
      {
        course.parts.map(part =>
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )
      }
      <footer>
        <strong>
          Total of { totalNumExercises() } exercises
        </strong>
      </footer>
    </article>
  )
}

export default Course