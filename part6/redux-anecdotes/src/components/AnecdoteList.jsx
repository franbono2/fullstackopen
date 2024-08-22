import { useDispatch, useSelector } from 'react-redux'
import { updatedAnecdoteVotes } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const sortByLikes = (anecdotes) => {
  return [...anecdotes].sort((a, b) => b.votes - a.votes)
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return sortByLikes(state.anecdotes)
    }
    const filteredAnecdotes = state.anecdotes.filter(anecdote => anecdote.content.toLocaleLowerCase().includes(state.filter))
    return sortByLikes(filteredAnecdotes)
  })

  const vote = (id) => {
    const anecdoteToChange = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(updatedAnecdoteVotes(id))
    dispatch(notify(`You voted '${anecdoteToChange.content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList