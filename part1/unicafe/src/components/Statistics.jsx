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
        <table>

          <tbody>
            <tr>
              <td>
                Good: 
              </td>
              <td>
                {good}
              </td>
            </tr>
            <tr>
              <td>
                Neutral: 
              </td>
              <td>
                {neutral}
              </td>
            </tr>
            <tr>
              <td>
                Bad:
              </td>
              <td>
                {bad}
              </td>
            </tr>
            <tr>
              <td>
                All:
              </td>
              <td>
                {all}
              </td>
            </tr>
            <tr>
              <td>
                Average:
              </td>
              <td>
                {average}
              </td>
            </tr>
            <tr>
              <td>
                Positive:
              </td>
              <td>
                {positive} %
              </td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }
}

export default Statistics