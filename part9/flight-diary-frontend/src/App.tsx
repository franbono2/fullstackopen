import { useEffect, useState } from 'react'
import { FlightDiary, NewFlightDiary } from './types'
import { getAllFlightDiaries, createFlightDiary } from './services/flightDiaryService'
import DiaryEntriesList from './components/DiaryEntriesList'
import DiaryForm from './components/DiaryForm'
import Notification from './components/Notification'

function App() {
  const [flightDiaries, setFlightDiaries] = useState<FlightDiary[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    getAllFlightDiaries().then(data => setFlightDiaries(data))
  }, [])

  const addNewDiary = (newDiary: NewFlightDiary) => {
      createFlightDiary(newDiary)
      .then(
        data => setFlightDiaries(flightDiaries.concat(data as FlightDiary))
      )
      .catch(
        error => {
          if (error instanceof Error) {
            setMessage(error.message.replace('Something went wrong. ', ''))
            setTimeout(() => {
              setMessage('')
            }, 5000)
          }
        }
      )
  }

  return (
    <>
      <h1>Flight Diary</h1>
      <Notification message={message} />
      <DiaryForm addNewDiary={addNewDiary} />
      <DiaryEntriesList diaries={flightDiaries} />
    </>
  )
}

export default App
