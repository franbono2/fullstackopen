import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setData: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setData(users));
  };
};

export const { setData } = usersSlice.actions;

export default usersSlice.reducer;
