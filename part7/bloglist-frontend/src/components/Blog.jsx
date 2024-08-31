import {
  updateBlogLikes,
  deleteBlog,
  addComment,
} from "../reducers/blogsReducer";
import { notify } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Link, TextField, Typography } from "@mui/material";

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
      <Typography variant="h5" component="h2" style={{ marginTop: 10 }}>
        {blog.title} by {blog.author}
      </Typography>
      <Link style={{ marginTop: 8 }} href={blog.url}>
        {blog.url}
      </Link>
      <p>
        <Typography variant="body1" component="span">
          likes: {blog.likes}
        </Typography>
        <Button
          variant="outlined"
          style={marginLeft}
          id="like-button"
          onClick={addLike}
        >
          like
        </Button>
      </p>
      <Typography variant="body1" component="p">
        Added by {blog.user.name}
      </Typography>
      <Typography variant="h6" component="h3">
        Comments
      </Typography>
      <TextField
        style={{ marginRight: 5 }}
        type="text"
        name="comment"
        id="comment"
        value={comment}
        variant="standard"
        label="Comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <Button
        style={{ paddingTop: 10, marginTop: 8 }}
        onClick={handleAddComment}
        variant="outlined"
      >
        add comment
      </Button>
      {blog.comments.length > 0 && (
        <div>
          <ul>
            {blog.comments.map((comment) => (
              <Typography key={comment} variant="body2" component="li">
                {comment}
              </Typography>
            ))}
          </ul>
        </div>
      )}
      <br />
      {isUserOwner() && (
        <Button
          style={{ marginTop: 10 }}
          id="remove-button"
          variant="contained"
          onClick={handleDelete}
        >
          remove
        </Button>
      )}
    </div>
  );
};

export default Blog;
