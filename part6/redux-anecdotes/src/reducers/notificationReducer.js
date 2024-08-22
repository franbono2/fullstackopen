import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 'Initial Notification'
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.value = action.payload
    },
    clearNotification(state) {
      state.value = ''
    }
  }
})

export const notify = (message, seconds) => {
  const miliseconds = seconds * 1000
  return async dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, miliseconds)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer