import React, { useState } from "react"
import { NewFlightDiary, Visibility, Weather } from "../types"

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

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value as Visibility)
  }
  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value as Weather)
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        Date: 
        <input 
          type="date"
          name="flightDate"
          id="flightDate"
          value={date} 
          onChange={(event) => setDate(event.target.value)} 
        /> 
        <br />
        Visibility:
        {Object.values(Visibility).map((vis) => (
          <div key={vis}>
            <input
              type="radio"
              id={vis}
              name="visibility"
              value={vis}
              onChange={handleVisibilityChange}
            />
            <label htmlFor={vis}>{vis}</label>
          </div>
        ))}
        Weather:
        {Object.values(Weather).map((weather) => (
          <div key={weather}>
            <input
              type="radio"
              id={weather}
              name="weather"
              value={weather}
              onChange={handleWeatherChange}
            />
            <label htmlFor={weather}>{weather}</label>
          </div>
        ))}
        Comment: <input value={comment} onChange={(event) => setComment(event.target.value)} /> <br />
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default DiaryForm