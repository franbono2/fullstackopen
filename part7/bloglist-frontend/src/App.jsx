import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import userService from "./services/users";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const BlogFormRef = useRef();

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
    } catch (error) {
      console.error(error);
      showMessage("wrong username or password");
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
      showMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`);
      setBlogs([...blogs, newBlog]);
    } catch (error) {
      console.error(error);
      showMessage("An error adding a new blog has occurred");
    }
  };

  const updateLikes = async (blog) => {
    try {
      const updatedBlog = await blogService.updateBlog(blog);
      showMessage(`blog ${updatedBlog.title} has one more like`);
      const updatedBlogList = blogs.map((blog) => {
        if (blog.id === updatedBlog.id) return updatedBlog;
        return blog;
      });
      setBlogs(updatedBlogList);
    } catch (error) {
      console.error(error);
      showMessage("An error updating likes has occurred");
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
        showMessage(`The blog ${blogToDelete.title} has been deleted`);
        setBlogs(updatedBlogList);
      } catch (error) {
        console.error(error);
        showMessage("An error deleting a blog has occurred");
      }
    }
  };

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    blogService.setToken(null);
  };

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />
      {user === null ? loginForm() : blogsApp()}
    </div>
  );
};

export default App;
