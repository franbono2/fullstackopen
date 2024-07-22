import { useState } from 'react'
import Statistics from './components/Statistics'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedAll = all + 1
    setGood(updatedGood)
    setAll(updatedAll)
    calculatePositive(updatedGood, updatedAll)
    calculateAverage(updatedGood, bad, updatedAll)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedAll = all + 1
    setNeutral(updatedNeutral)
    setAll(updatedAll)
    calculatePositive(good, updatedAll)
    calculateAverage(good, bad, updatedAll)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedAll = all + 1
    setBad(updatedBad)
    setAll(updatedAll)
    calculatePositive(good, updatedAll)
    calculateAverage(good, updatedBad, updatedAll)
  }

  const calculateAverage = (good, bad, all) => {
    setAverage((good - bad) / all)
  }

  const calculatePositive = (good, all) => {
    setPositive((good / all) * 100)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <section>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </section>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all} 
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App