/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    value: "",
  },
  reducers: {
    show: (state, action) => {
      state.value = action.payload;
    },
    clear: (state) => {
      state.value = "";
    },
  },
});

export const notify = (message, seconds) => {
  const miliseconds = seconds * 1000;
  return async (dispatch) => {
    dispatch(show(message));
    setTimeout(() => {
      dispatch(clear());
    }, miliseconds);
  };
};

export const { show, clear } = notificationSlice.actions;
export default notificationSlice.reducer;
