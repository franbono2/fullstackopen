import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <section>
        <button onClick={() => {setGood(good + 1)}}>good</button>
        <button onClick={() => {setNeutral(neutral + 1)}}>neutral</button>
        <button onClick={() => {setBad(bad + 1)}}>bad</button>
      </section>
      <h1>Statistics</h1>
      <section>
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
      </section>
    </div>
  )
}

export default App