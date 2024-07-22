const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all == 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </>
    )
  } else {
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
}

export default Statistics