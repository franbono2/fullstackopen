import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const sortByLikes = (blogs) => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  };
  const blogs = useSelector((state) => sortByLikes(state.blogs));

  const blogListStyle = {
    marginTop: 15,
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogListStyle}>
      {blogs.map((blog) => (
        <p style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </p>
      ))}
    </div>
  );
};

export default BlogList;
