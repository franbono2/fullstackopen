const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const manyBlogs = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }  
]

const oneBlog = [
  {
    id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
]

const noBlogs = []

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('list is empty', () => {
    const res = listHelper.totalLikes(noBlogs)
    assert.strictEqual(res, 0)
  })

  test('list with one blog', () => {
    const res = listHelper.totalLikes(oneBlog)
    assert.strictEqual(res, 2)
  })

  test('list with many blogs', () => {
    const res = listHelper.totalLikes(manyBlogs)
    assert.strictEqual(res, 36)
  })
})

describe('favorite blog', () => {
  test('list is empty', () => {
    const res = listHelper.favoriteBlog(noBlogs)
    assert.strictEqual(res, 0)
  })

  test('list with one blog', () => {
    const res = listHelper.favoriteBlog(oneBlog)
    const favoriteBlog = oneBlog.at(0)
    assert.deepStrictEqual(res, favoriteBlog)
  })

  test('list with many blogs', () => {
    const res = listHelper.favoriteBlog(manyBlogs)
    const favoriteBlog = manyBlogs.at(2)
    assert.deepStrictEqual(res, favoriteBlog)
  })
})