import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../contexts/UserContext';
import blogService from '../services/blogs';
import Comments from './Comments';

const BlogView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getById(id),
  });

  const likeMutation = useMutation({
    mutationFn: (blogToLike) => {
      const updatedBlog = { ...blogToLike, likes: blogToLike.likes + 1 };
      return blogService.update(blogToLike.id, updatedBlog);
    },
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries(['blog', updatedBlog.id]);
      queryClient.invalidateQueries(['blogs']);
    },
  });

  const handleLike = () => {
    if (blog) {
      likeMutation.mutate(blog);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: (blogId) => blogService.remove(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
      navigate('/');
    },
  });

  const handleDelete = () => {
    if (
      blog &&
      window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)
    ) {
      deleteMutation.mutate(blog.id);
    }
  };

  if (isLoading) return <div>Loading blog...</div>;
  if (isError) return <div>Error loading blog details.</div>;

  const canDelete =
    user &&
    blog.user &&
    (user.username === blog.user.username || user.id === blog.user.id);

  return (
    <div style={{ padding: '1em' }}>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>URL: {blog.url}</div>
      <div>
        Likes: {blog.likes}{' '}
        <button onClick={handleLike} style={{ marginLeft: '0.5em' }}>
          Like
        </button>
      </div>
      {canDelete && (
        <div style={{ marginTop: '0.5em' }}>
          <button onClick={handleDelete} style={{ color: 'red' }}>
            Delete
          </button>
        </div>
      )}
      <Comments blog={blog} />
    </div>
  );
};

export default BlogView;
