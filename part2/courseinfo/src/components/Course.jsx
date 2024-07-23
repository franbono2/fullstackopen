const Course = ({ course }) => {

  return (
    <article>
      <header>
        <h1>{course.name}</h1>
      </header>
      {
        course.parts.map( part => 
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )
      }
    </article>
  )
}

export default Course