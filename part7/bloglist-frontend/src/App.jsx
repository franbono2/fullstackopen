/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import User from "./components/User";
import Blog from "./components/Blog";
import { notify } from "./reducers/notificationReducer";
import { setUser, clearUser } from "./reducers/userReducer";
import { initializeBlogs, createBlog } from "./reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "./reducers/usersReducer";
import { Link, Routes, Route, useMatch } from "react-router-dom";

const App = () => {
  const BlogFormRef = useRef();
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const userMatch = useMatch("/users/:id");
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;
  const blogs = useSelector((state) => state.blogs);
  const blogMatch = useMatch("/blogs/:id");
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

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

  const blogsList = () => (
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
        <h3>Welcome: {userLoggedIn.name}</h3>
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

  const navigation = () => (
    <nav>
      <ul>
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <div>
      <Notification />
      <h1>Blogs</h1>
      {userLoggedIn === null ? (
        loginForm()
      ) : (
        <div>
          {navigation()}
          <Routes>
            <Route path="/" element={userInfo()} />
            <Route path="/blogs" element={blogsList()} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User user={user} />} />
            <Route path="/blogs/:id" element={<Blog blog={blog} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
