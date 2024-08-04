const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (_request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0
  })

  blog.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const newBlog = new Blog(request.body)
  const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, {new: true})
  response.json(updatedBlog)
})

module.exports = blogRouter