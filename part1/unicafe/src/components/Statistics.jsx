import StatisticsLine from "./StatisticsLine"

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
            <StatisticsLine text={'Good'} value={good} />
            <StatisticsLine text={'Neutral'} value={neutral} />
            <StatisticsLine text={'Bad'} value={bad} />
            <StatisticsLine text={'All'} value={all} />
            <StatisticsLine text={'Average'} value={average} />
            <StatisticsLine text={'Positive'} value={positive} extraChar={'%'}/>
          </section>
      </>
    )
  }
}

export default Statistics