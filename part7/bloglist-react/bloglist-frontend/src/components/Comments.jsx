import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blog', updatedBlog.id] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id: blog.id, comment });
    setComment('');
  };

  return (
    <div style={{ marginTop: '1em' }}>
      <h3>Comments</h3>
      <ul>
        {blog.comments?.map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} style={{ marginTop: '0.5em' }}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" style={{ marginLeft: '0.5em' }}>
          Add Comment
        </button>
      </form>
    </div>
  );
};

Comments.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Comments;
