import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogList: (_state, action) => {
      return action.payload;
    },
    addBlog: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogList(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.addBlog(blog);
    dispatch(addBlog(newBlog));
  };
};

export const { setBlogList, addBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
