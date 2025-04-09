const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Author One',
    url: 'http://example.com/first',
    likes: 5,
  },
  {
    title: 'Second Blog',
    author: 'Author Two',
    url: 'http://example.com/second',
    likes: 7,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'temp', author: 'temp', url: 'http://temp.com', likes: 0 })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb
}
