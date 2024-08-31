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
import { Link, Routes, Route, useMatch, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

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
  const navigate = useNavigate();

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
    <div>
      <h1>Blogs</h1>
      <Togglable buttonLabel="login">
        <LoginForm />
      </Togglable>
    </div>
  );

  const blogsList = () => (
    <div style={{ marginTop: 10 }}>
      <Togglable buttonLabel="new Blog" ref={BlogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <BlogList />
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
    navigate("/");
    dispatch(clearUser());
  };

  const navBar = () => (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Blogs
        </Typography>
        <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
          {userLoggedIn.name} logged in
        </Typography>
        <Box>
          <Button component={Link} color="inherit" to="/blogs">
            Blogs
          </Button>
          <Button component={Link} color="inherit" to="/users">
            Users
          </Button>
          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );

  const EmptyComponent = () => null;

  return (
    <Container>
      {userLoggedIn === null ? (
        loginForm()
      ) : (
        <div>
          {navBar()}
          <Notification />
          <Routes>
            <Route path="/" element={<EmptyComponent />} />
            <Route path="/blogs" element={blogsList()} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User user={user} />} />
            <Route path="/blogs/:id" element={<Blog blog={blog} />} />
          </Routes>
        </div>
      )}
    </Container>
  );
};

export default App;
