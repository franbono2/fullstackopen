const StatisticsLine = ({ text, value, extraChar}) => {
  
  return (
    <>
      <p>{text}: {value} {extraChar}</p>
    </>
  )
}

export default StatisticsLine