import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";

const BlogList = ({ updateLikes, deleteBlog }) => {
  const sortByLikes = (blogs) => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  };
  const blogs = useSelector((state) => sortByLikes(state.blogs));
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  const blogListStyle = {
    marginTop: 15,
  };

  return (
    <div style={blogListStyle}>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default BlogList;
