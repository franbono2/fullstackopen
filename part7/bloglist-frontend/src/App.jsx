/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import userService from "./services/users";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import { notify } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogsReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const [user, setUser] = useState(null);

  const BlogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if (loggedUserJson) {
      const loggedUser = JSON.parse(loggedUserJson);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm logUser={logUser} />
    </Togglable>
  );

  const logUser = async (user) => {
    try {
      const loggedUser = await userService.loginUser(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      dispatch(notify("log in succeed", 5));
    } catch (error) {
      console.error(error);
      dispatch(notify("wrong username or password", 5));
    }
  };

  const blogsApp = () => (
    <div>
      <header>
        <h3>Welcome: {user.name}</h3>
      </header>
      <Togglable buttonLabel="new Blog" ref={BlogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <BlogList />
      <br />
      <footer>
        <button onClick={handleLogout}>logout</button>
      </footer>
    </div>
  );

  const addBlog = async (blog) => {
    try {
      dispatch(createBlog(blog));
      BlogFormRef.current.toggleVisibility();
      dispatch(notify(`A new blog ${blog.title} by ${blog.author} added`, 5));
    } catch (error) {
      console.error(error);
      dispatch(notify("An error adding a new blog has occurred", 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    blogService.setToken(null);
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user === null ? loginForm() : blogsApp()}
    </div>
  );
};

export default App;
