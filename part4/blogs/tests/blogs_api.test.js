const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogsObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogsObjects.map(blog => blog.save())

  await Promise.all(promiseArray)
})

test('GET all blogs in json', async () => {
  await api.get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('GET all blogs', async () => {
  const res = await api.get('/api/blogs/')
   
  assert.strictEqual(res.body.length, initialBlogs.length)
})

test('Check blogs id', async () => {
  const res = await api.get('/api/blogs/')
  res.body.forEach(blog => {
    const id = Object.keys(blog).find(prop => prop === 'id')
    assert.strictEqual(id, 'id')
  })
})

test('POST valid blog is added', async () => {
  const newBlog = {
    title: "Escape from FullStack",
    author: "Pepe W. Navarro",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 12
  }

  await api.post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs/')
  assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length + 1)

  const contents = blogsAtEnd.body.map(blog => blog.title)
  assert(contents.includes("Escape from FullStack"))
})

test('POST blog without likes contains 0 likes', async () => {
  const newBlog = {
    title: "Escape from FullStack",
    author: "Pepe W. Navarro",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  }

  await api.post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs/')
  assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length + 1)

  const contents = blogsAtEnd.body.map(blog => blog.likes)
  assert(contents.includes(0))
})

after(async () => {
  await mongoose.connection.close()
})