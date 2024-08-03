const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likeReducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(likeReducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}