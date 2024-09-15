import { FlightDiary } from '../types'

const DiaryEntriesList = ({ diaries } : { diaries : FlightDiary[] }) => {

  return (
    <>
      <h2>Diary Entries</h2>
      <section>
        {
          diaries.map(diary => {
            return (
              <div key={diary.id}>
                <h4>{diary.date}</h4>
                <p>visibility: {diary.visibility}</p>
                <p>weather: {diary.weather}</p>
              </div>
            )
          })
        }
      </section>
    </>
  )
}

export default DiaryEntriesList