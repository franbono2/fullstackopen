import {
  updateBlogLikes,
  deleteBlog,
  addComment,
} from "../reducers/blogsReducer";
import { notify } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Blog = ({ blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  if (!blog) return null;

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

  const handleAddComment = () => {
    try {
      dispatch(addComment(blog.id, { comment }));
      dispatch(notify(`The comment ${comment} has been added`, 5));
      setComment("");
    } catch (error) {
      console.error(error);
      dispatch(notify("An error adding a comment has occurred", 5));
    }
  };

  const marginLeft = {
    marginLeft: 5,
  };

  return (
    <div className="blog">
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        likes: {blog.likes}
        <button style={marginLeft} id="like-button" onClick={addLike}>
          like
        </button>
      </p>
      <p>Added by {blog.user.name}</p>
      <h3>Comments</h3>
      <input
        type="text"
        name="comment"
        id="comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button onClick={handleAddComment}>add comment</button>
      {blog.comments.length > 0 && (
        <div>
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment}>{comment}</li>
            ))}
          </ul>
        </div>
      )}
      <br />
      {isUserOwner() && (
        <button id="remove-button" onClick={handleDelete}>
          remove
        </button>
      )}
    </div>
  );
};

export default Blog;