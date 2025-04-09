const test = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '1234567890',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5,
    __v: 0
  }
]

test('when list has only one blog, equals the likes of that blog', () => {
  const result = listHelper.totalLikes(listWithOneBlog)
  assert.strictEqual(result, 5)
})

test('of empty list is zero', () => {
  const result = listHelper.totalLikes([])
  assert.strictEqual(result, 0)
})
