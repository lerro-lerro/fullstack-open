const test = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '1',
    title: 'First Blog',
    author: 'Author1',
    url: 'http://example.com/1',
    likes: 10,
    __v: 0
  },
  {
    _id: '2',
    title: 'Second Blog',
    author: 'Author2',
    url: 'http://example.com/2',
    likes: 20,
    __v: 0
  },
  {
    _id: '3',
    title: 'Third Blog',
    author: 'Author3',
    url: 'http://example.com/3',
    likes: 15,
    __v: 0
  }
]

test('favorite blog is the one with most likes', () => {
  const result = listHelper.favoriteBlog(blogs)
  assert.deepStrictEqual(result, blogs[1])
})
