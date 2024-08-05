const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

const initialUsers = [
  {
    username: "Admin",
    password: "Admin",
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsers)
})

describe('User creation tests', () => {
  test('invalid user (username) is not added to DB', async () => {
    const newInvalidUser = {
      username: "Pe",
      password: "123456789"
    }
  
    await api.post('/api/users/')
      .send(newInvalidUser)
      .expect(400)
  
    const usersAtEnd = await api.get('/api/users/')
    assert.strictEqual(usersAtEnd.body.length, initialUsers.length)
  })
  test('invalid user (password) is not added to DB', async () => {
    const newInvalidUser = {
      username: "Pepe",
      password: "12"
    }
  
    await api.post('/api/users/')
      .send(newInvalidUser)
      .expect(400)
  
    const usersAtEnd = await api.get('/api/users/')
    assert.strictEqual(usersAtEnd.body.length, initialUsers.length)
  })
  test('invalid user (password) response correct', async () => {
    const newInvalidUser = {
      username: "Pepe",
      password: "12"
    }
  
    const result = await api.post('/api/users/')
      .send(newInvalidUser)
      .expect(400)
      
    assert.strictEqual(result.error.text, 'The password is too short')
  })
  test('invalid user (username) response correct', async () => {
    const newInvalidUser = {
      username: "Pe",
      password: "124343443"
    }
  
    const result = await api.post('/api/users/')
      .send(newInvalidUser)
      .expect(400)
    
    console.log(result.body.error)
    assert(result.body.error.includes('is shorter than the minimum allowed length'))
  })
})

after(async () => {
  await mongoose.connection.close()
})