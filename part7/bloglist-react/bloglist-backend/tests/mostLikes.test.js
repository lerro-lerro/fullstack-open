const test = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  { _id: '1', title: 'Blog 1', author: 'Author1', url: 'http://example.com/1', likes: 5, __v: 0 },
  { _id: '2', title: 'Blog 2', author: 'Author2', url: 'http://example.com/2', likes: 10, __v: 0 },
  { _id: '3', title: 'Blog 3', author: 'Author2', url: 'http://example.com/3', likes: 7, __v: 0 }
]

test('author with most likes', () => {
  const result = listHelper.mostLikes(blogs)
  const expected = { author: 'Author2', likes: 17 }
  assert.deepStrictEqual(result, expected)
})
