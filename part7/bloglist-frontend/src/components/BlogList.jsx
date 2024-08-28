import Blog from "./Blog";

const BlogList = ({ blogs, updateLikes, deleteBlog }) => {
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
