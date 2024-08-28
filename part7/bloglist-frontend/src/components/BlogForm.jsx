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

  return (
    <form onSubmit={handleBlogSubmit}>
      <div>
        title:
        <input
          id="title"
          type="text"
          value={title}
          aria-label="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id="author"
          type="text"
          value={author}
          aria-label="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id="url"
          type="text"
          value={url}
          aria-label="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="create-note-button" type="submit">
        create
      </button>
    </form>
  );
};

export default BlogForm;
