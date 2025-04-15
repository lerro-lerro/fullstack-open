const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// This endpoint clears all documents from the blogs and users collections.
// It should be used only during testing.
testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  response.status(204).end()
})

module.exports = testingRouter
