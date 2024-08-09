import { useState } from "react"

const Blog = ({ blog, updateLikes }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [buttonText, setButtonText] = useState('view')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const detailsVisible = { display: showDetails ? '' : 'none' }

  const toggleShowDetails = () => {
    showDetails ? setButtonText('view') : setButtonText('hide')
    setShowDetails(!showDetails)
  }

  const addLike = () => {
    const updatedBlog = {...blog, likes: blog.likes + 1}
    updateLikes(updatedBlog)
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleShowDetails}>{buttonText}</button>
      <div style={detailsVisible}>
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes}
          <button onClick={addLike}>like</button>
        </p>
        <p>{blog.author}</p>
      </div>
    </div>  
  )
}

export default Blog