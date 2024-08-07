const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogRouter.get('/', (_request, response) => {
  Blog.find({}).populate('user', { username: 1, name: 1 })
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, config.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user.id,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

const getTokenFrom = request => {
  const auth = request.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    return auth.replace('Bearer ', '')
  }
  return null
}

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { title, author, url, likes } = request.body
  const newBlog = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, {new: true})
  response.json(updatedBlog)
})

module.exports = blogRouter