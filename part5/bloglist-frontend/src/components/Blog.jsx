import { useState } from "react"

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleShowDetails}>{buttonText}</button>
      <div style={detailsVisible}>
        <p>{blog.url}</p>
        <p>likes: {blog.likes}</p>
        <p>{blog.author}</p>
      </div>
    </div>  
  )
}

export default Blog