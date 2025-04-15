import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const BlogList = () => {
  const blogFormRef = useRef();

  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    select: (data) => data.sort((a, b) => b.likes - a.likes),
  });

  if (isLoading) return <div>Loading blogs...</div>;
  if (isError) return <div>Error loading blogs.</div>;

  return (
    <div style={{ padding: '1em' }}>
      <h2>Blogs</h2>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
