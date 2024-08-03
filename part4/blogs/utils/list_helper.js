const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likeReducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(likeReducer, 0)
}

const favoriteBlog = (blogs) => {
  const favoriteBlogReducer = (prev, current) => {
    return (prev && prev.likes > current.likes) ? prev : current
  }
  return blogs.length === 0 ? 0 : blogs.reduce(favoriteBlogReducer)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}