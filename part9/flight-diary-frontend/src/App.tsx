import { useEffect, useState } from 'react'
import { FlightDiary } from './types'
import { getAllFlightDiaries } from './services/flightDiaryService'
import DiaryEntriesList from './components/DiaryEntriesList'

function App() {
  const [flightDiaries, setFlightDiaries] = useState<FlightDiary[]>([])

  useEffect(() => {
    getAllFlightDiaries().then(data => setFlightDiaries(data))
  }, [])

  return (
    <>
      <h1>Flight Diary</h1>
      <DiaryEntriesList diaries={flightDiaries} />
    </>
  )
}

export default App
