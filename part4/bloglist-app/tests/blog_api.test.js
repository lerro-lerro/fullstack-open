const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let token = ''
let testUserId = ''

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  await api
    .post('/api/users')
    .send({ username: 'testuser', name: 'Test User', password: 'secret' })

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'secret' })
  token = loginResponse.body.token

  const testUserDb = await User.findOne({ username: 'testuser' })
  testUserId = testUserDb._id

  const blogObjects = helper.initialBlogs.map(blog => (
    new Blog({ ...blog, user: testUserId })
  ))
  await Promise.all(blogObjects.map(blog => blog.save()))
})

describe('when there are some blogs saved initially', () => {
  test('blogs are returned as json (GET /api/blogs)', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    assert.ok(Array.isArray(response.body))
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      assert.ok(blog.id, 'Expected blog to have an id field')
    })
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'New Blog Post',
        author: 'New Author',
        url: 'http://example.com/new',
        likes: 8
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    })

    test('if likes property is missing it defaults to 0', async () => {
      const newBlog = {
        title: 'Blog Without Likes',
        author: 'No Likes Auth',
        url: 'http://example.com/nolikes'
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      assert.strictEqual(response.body.likes, 0)
    })

    test('blog without title or url is not added', async () => {
      const newBlog = {
        author: 'Missing Title and URL',
        likes: 5
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid and creator matches', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with valid data and updates likes', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: blogToUpdate.likes + 1
      }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
