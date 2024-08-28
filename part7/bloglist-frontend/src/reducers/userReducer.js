import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import userService from "../services/users";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setData: (_state, action) => {
      return action.payload;
    },
    clearData: () => {
      return null;
    },
  },
});

export const setUser = (loggedUserJson) => {
  return async (dispatch) => {
    const loggedUser = JSON.parse(loggedUserJson);
    dispatch(setData(loggedUser));
    blogService.setToken(loggedUser.token);
  };
};

export const logUser = (user) => {
  return async (dispatch) => {
    const loggedUser = await userService.loginUser(user);
    window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    dispatch(setData(loggedUser));
    blogService.setToken(loggedUser.token);
  };
};

export const clearUser = () => {
  return async (dispatch) => {
    dispatch(clearData());
    blogService.setToken(null);
  };
};

export const { setData, clearData } = userSlice.actions;

export default userSlice.reducer;
