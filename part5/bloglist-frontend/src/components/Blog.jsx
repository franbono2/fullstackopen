import { useState } from "react"

const Blog = ({ blog, updateLikes, deleteBlog }) => {
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

  const isUserOwner = () => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (!loggedUserJson) return false

    const loggedUser = JSON.parse(loggedUserJson)
    if (loggedUser.username !== blog.user.username) return false

    return true 
  }

  const handleDelete = () => {
    deleteBlog(blog.id)
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
        {
          isUserOwner() && <button onClick={handleDelete}>remove</button>
        }
      </div>
    </div>  
  )
}

export default Blog