const Statistics = ({good, neutral, bad, all, average, positive}) => {

  return (
    <>
      <h1>Statistics</h1>
      <section>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>All: {all}</p>
        <p>Average: {average}</p>
        <p>Positive: {positive}%</p>
      </section>
    </>
  )
}

export default Statistics