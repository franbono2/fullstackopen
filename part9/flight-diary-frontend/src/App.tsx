import { useEffect, useState } from 'react'
import { FlightDiary, NewFlightDiary } from './types'
import { getAllFlightDiaries, createFlightDiary } from './services/flightDiaryService'
import DiaryEntriesList from './components/DiaryEntriesList'
import DiaryForm from './components/DiaryForm'

function App() {
  const [flightDiaries, setFlightDiaries] = useState<FlightDiary[]>([])

  useEffect(() => {
    getAllFlightDiaries().then(data => setFlightDiaries(data))
  }, [])

  const addNewDiary = (newDiary: NewFlightDiary) => {
    createFlightDiary(newDiary).then(data => setFlightDiaries(flightDiaries.concat(data)))
  }

  return (
    <>
      <h1>Flight Diary</h1>
      <DiaryForm addNewDiary={addNewDiary} />
      <DiaryEntriesList diaries={flightDiaries} />
    </>
  )
}

export default App
