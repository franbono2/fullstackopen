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
  await Blog.insertMany(initialBlogs)
})

describe('Tests for api GET', () => {
  test('GET all blogs in json', async () => {
    await api.get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('GET all blogs', async () => {
    const res = await api.get('/api/blogs/')
     
    assert.strictEqual(res.body.length, initialBlogs.length)
  })
})

describe('Check Id', () => {
  test('Check blogs id', async () => {
    const res = await api.get('/api/blogs/')
    res.body.forEach(blog => {
      const id = Object.keys(blog).find(prop => prop === 'id')
      assert.strictEqual(id, 'id')
    })
  })
})

describe('Test for api POST', () => {
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
  
  test('POST invalid blog (no author) is not added', async () => {
    const newBlog = {
      title: "Escape from FullStack",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    }
  
    await api.post('/api/blogs/')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await api.get('/api/blogs/')
    assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length)
  })
  
  test('POST invalid blog (no title) is not added', async () => {
    const newBlog = {
      author: "Pepe W. Navarro",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    }
  
    await api.post('/api/blogs/')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await api.get('/api/blogs/')
    assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length)
  })
})

describe('Test for api DELETE', () => {
  test('DELETE blog by id', async () => {
    const blogsAtStart = await api.get('/api/blogs/')
    const blogToDelete = blogsAtStart.body[0]
    await api.delete(`/api/blogs/${blogToDelete.id}/`).expect(204)

    const blogsAfterDelete = await api.get('/api/blogs/')
    assert.strictEqual(blogsAfterDelete.body.length, blogsAtStart.body.length - 1)

    const titles = blogsAfterDelete.body.map(blog => blog.title)
    assert(!titles.includes(blogToDelete.title))
  })
})

describe('Test for api PUT', () => {
  test('UPDATE blog by id', async () => {
    const blogsAtStart = await api.get('/api/blogs/')
    const blogToUpdate = blogsAtStart.body[0]
    blogToUpdate.likes = 10
    await api.put(`/api/blogs/${blogToUpdate.id}/`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAfterUpdate = await api.get('/api/blogs/')
    assert.strictEqual(blogsAfterUpdate.body.length, blogsAtStart.body.length)

    const updatedBlog = blogsAfterUpdate.body.find(blog => blog.id === blogToUpdate.id)
    assert.strictEqual(updatedBlog.likes, 10)
  })
})

after(async () => {
  await mongoose.connection.close()
})