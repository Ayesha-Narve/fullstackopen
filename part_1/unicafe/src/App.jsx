import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad

const average = all === 0 ? 0 : (good - bad) / all

const positive = all === 0 ? 0 : (good / all) * 100

  return (
    <div>

      <h1>Give Feedback</h1>

      <button onClick={() => setGood(good + 1)}>
        Good
      </button>

      <button onClick={() => setNeutral(neutral + 1)}>
        Neutral
      </button>

      <button onClick={() => setBad(bad + 1)}>
        Bad
      </button>

      <h2>Statistics</h2>

      <p>Good {good}</p>

      <p>Neutral {neutral}</p>

      <p>Bad {bad}</p>

      <p>All {all}</p>

<p>Average {average}</p>

<p>Positive {positive} %</p>

    </div>
  )
}

export default App