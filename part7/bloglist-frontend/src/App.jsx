import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import userService from "./services/users";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import { notify } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const BlogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if (loggedUserJson) {
      const loggedUser = JSON.parse(loggedUserJson);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

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

  const blogsSortByLikes = () => blogs.sort((a, b) => b.likes - a.likes);

  const blogsApp = () => (
    <div>
      <header>
        <h3>Welcome: {user.name}</h3>
      </header>
      <Togglable buttonLabel="new Blog" ref={BlogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <BlogList
        blogs={blogsSortByLikes()}
        updateLikes={updateLikes}
        deleteBlog={deleteBlog}
      />
      <br />
      <footer>
        <button onClick={handleLogout}>logout</button>
      </footer>
    </div>
  );

  const addBlog = async (blog) => {
    try {
      const newBlog = await blogService.addBlog(blog);
      BlogFormRef.current.toggleVisibility();
      dispatch(
        notify(`A new blog ${newBlog.title} by ${newBlog.author} added`, 5),
      );
      setBlogs([...blogs, newBlog]);
    } catch (error) {
      console.error(error);
      dispatch(notify("An error adding a new blog has occurred", 5));
    }
  };

  const updateLikes = async (blog) => {
    try {
      const updatedBlog = await blogService.updateBlog(blog);
      dispatch(notify(`blog ${updatedBlog.title} has one more like`, 5));
      const updatedBlogList = blogs.map((blog) => {
        if (blog.id === updatedBlog.id) return updatedBlog;
        return blog;
      });
      setBlogs(updatedBlogList);
    } catch (error) {
      console.error(error);
      dispatch(notify("An error updating likes has occurred", 5));
    }
  };

  const deleteBlog = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`,
      )
    ) {
      try {
        await blogService.deleteBlog(id);
        const updatedBlogList = blogs.filter((blog) => {
          if (blog.id !== id) return blog;
        });
        dispatch(notify(`The blog ${blogToDelete.title} has been deleted`, 5));
        setBlogs(updatedBlogList);
      } catch (error) {
        console.error(error);
        dispatch(notify("An error deleting a blog has occurred", 5));
      }
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
