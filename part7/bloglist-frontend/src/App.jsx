/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import { notify } from "./reducers/notificationReducer";
import { setUser, clearUser } from "./reducers/userReducer";
import { initializeBlogs, createBlog } from "./reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import UserList from "./components/UserList";
import { initializeUsers } from "./reducers/usersReducer";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  const BlogFormRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  //TODO: router /users
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if (loggedUserJson) {
      dispatch(setUser(loggedUserJson));
    }
  }, []);

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm />
    </Togglable>
  );

  const blogs = () => (
    <div>
      <hr />
      <Togglable buttonLabel="new Blog" ref={BlogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <BlogList />
    </div>
  );

  const userInfo = () => (
    <div>
      <header>
        <h3>Welcome: {user.name}</h3>
      </header>
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
    dispatch(clearUser());
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Blogs</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
      <h1>Blogs</h1>
      <Notification />
      {user === null ? loginForm() : userInfo()}
      <Routes>
        <Route path="/" element={blogs()} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
};

export default App;
