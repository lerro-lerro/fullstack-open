const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((fav, blog) => blog.likes > fav.likes ? blog : fav, blogs[0])
}

const mostBlogs = (blogs) => {
  const counts = {}
  blogs.forEach(blog => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
  })
  let maxBlogs = 0
  let topAuthor = null
  for (const author in counts) {
    if (counts[author] > maxBlogs) {
      maxBlogs = counts[author]
      topAuthor = author
    }
  }
  return { author: topAuthor, blogs: maxBlogs }
}

const mostLikes = (blogs) => {
  const likesCount = {}
  blogs.forEach(blog => {
    likesCount[blog.author] = (likesCount[blog.author] || 0) + (blog.likes || 0)
  })
  let maxLikes = 0
  let topAuthor = null
  for (const author in likesCount) {
    if (likesCount[author] > maxLikes) {
      maxLikes = likesCount[author]
      topAuthor = author
    }
  }
  return { author: topAuthor, likes: maxLikes }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
