import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogListAfterUpdate = (state, action) => {
  const updatedBlog = action.payload;
  return state.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog));
};

const blogListAfterDelete = (state, action) => {
  const id = action.payload;
  return state.filter((blog) => blog.id !== id);
};

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
    updateBlog: (state, action) => {
      return blogListAfterUpdate(state, action);
    },
    remove: (state, action) => {
      return blogListAfterDelete(state, action);
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

export const updateBlogLikes = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog(blog);
    dispatch(updateBlog(updatedBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(remove(id));
  };
};

export const { setBlogList, addBlog, updateBlog, remove } = blogsSlice.actions;
export default blogsSlice.reducer;
