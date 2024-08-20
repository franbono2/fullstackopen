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

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer