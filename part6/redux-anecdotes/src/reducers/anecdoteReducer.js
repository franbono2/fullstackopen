import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const changeAnecdoteVotes = (state, action) => {
  const id = action.payload
  const anecdoteToChange = state.find(anecdote => anecdote.id === id)
  const changedAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1
  }
  return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
}

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return changeAnecdoteVotes(state, action)
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(_state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer