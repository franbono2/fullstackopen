import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    addBlog({
      title,
      author,
      url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const textStyle = {
    marginBottom: 10,
  };

  return (
    <Box style={formStyle} component="form" onSubmit={handleBlogSubmit}>
      <TextField
        id="title"
        style={textStyle}
        type="text"
        value={title}
        name="title"
        aria-label="title"
        variant="filled"
        label="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
      <TextField
        id="author"
        style={textStyle}
        type="text"
        value={author}
        name="author"
        aria-label="author"
        variant="filled"
        label="Author"
        onChange={({ target }) => setAuthor(target.value)}
      />
      <TextField
        id="url"
        style={textStyle}
        type="text"
        value={url}
        name="url"
        aria-label="url"
        variant="filled"
        label="Url"
        onChange={({ target }) => setUrl(target.value)}
      />
      <Button variant="contained" id="create-note-button" type="submit">
        create
      </Button>
    </Box>
  );
};

export default BlogForm;
