import { useState } from "react";
import { updateBlogLikes, deleteBlog } from "../reducers/blogsReducer";
import { notify } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [buttonText, setButtonText] = useState("view");
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const detailsVisible = { display: showDetails ? "" : "none" };
  const dispatch = useDispatch();

  const toggleShowDetails = () => {
    showDetails ? setButtonText("view") : setButtonText("hide");
    setShowDetails(!showDetails);
  };

  const addLike = () => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      dispatch(updateBlogLikes(updatedBlog));
      dispatch(notify(`blog ${updatedBlog.title} has one more like`, 5));
    } catch (error) {
      console.error(error);
      dispatch(notify("An error updating likes has occurred", 5));
    }
  };

  const isUserOwner = () => {
    const loggedUserJson = window.localStorage.getItem("loggedUser");
    if (!loggedUserJson) return false;

    const loggedUser = JSON.parse(loggedUserJson);
    if (loggedUser.username !== blog.user.username) return false;

    return true;
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog.id));
        dispatch(notify(`The blog ${blog.title} has been deleted`, 5));
      } catch (error) {
        console.error(error);
        dispatch(notify("An error deleting a blog has occurred", 5));
      }
    }
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title}
      <p>{blog.author}</p>
      <button onClick={toggleShowDetails}>{buttonText}</button>
      <div style={detailsVisible} className="startHidden">
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes}
          <button id="like-button" onClick={addLike}>
            like
          </button>
        </p>
        {isUserOwner() && (
          <button id="remove-button" onClick={handleDelete}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
