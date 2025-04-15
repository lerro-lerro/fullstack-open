import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import { useNotification } from '../contexts/NotificationContext';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const queryClient = useQueryClient();
  const { dispatch: notificationDispatch } = useNotification();

  const createBlogMutation = useMutation({
    mutationFn: (newBlog) => blogService.create(newBlog),
    onSuccess: (createdBlog) => {
      queryClient.invalidateQueries(['blogs']);
      notificationDispatch({
        type: 'SET',
        payload: {
          message: `A new blog "${createdBlog.title}" by ${createdBlog.author} added!`,
          type: 'success',
        },
      });
      setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000);
    },
    onError: () => {
      notificationDispatch({
        type: 'SET',
        payload: { message: 'Failed to create a new blog', type: 'error' },
      });
      setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000);
    },
  });

  const handleCreate = (e) => {
    e.preventDefault();
    createBlogMutation.mutate({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div
      style={{ border: '1px solid #ccc', padding: '1em', marginBottom: '1em' }}
    >
      <h3>Create New Blog</h3>
      <form onSubmit={handleCreate}>
        <div style={{ marginBottom: '0.5em' }}>
          <label>Title </label>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div style={{ marginBottom: '0.5em' }}>
          <label>Author </label>
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div style={{ marginBottom: '0.5em' }}>
          <label>URL </label>
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Add blog</button>
      </form>
    </div>
  );
};

export default BlogForm;
