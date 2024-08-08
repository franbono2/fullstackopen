import Blog from './Blog'

const BlogList = ({ blogs }) => {
  const blogListStyle = {
    marginTop: 15
  }

  return (
    <div style={blogListStyle}>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList