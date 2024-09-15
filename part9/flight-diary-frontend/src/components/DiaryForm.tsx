import React, { useState } from "react"
import { NewFlightDiary } from "../types"

const DiaryForm = ({ addNewDiary } : { addNewDiary : (newDiary: NewFlightDiary) => void }) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    addNewDiary({
      date,
      visibility,
      weather,
      comment
    } as NewFlightDiary)
    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        Date: <input value={date} onChange={(event) => setDate(event.target.value)} /> <br />
        Visibility: <input value={visibility} onChange={(event) => setVisibility(event.target.value)} /> <br />
        Weather: <input value={weather} onChange={(event) => setWeather(event.target.value)} /> <br />
        Comment: <input value={comment} onChange={(event) => setComment(event.target.value)} /> <br />
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default DiaryForm