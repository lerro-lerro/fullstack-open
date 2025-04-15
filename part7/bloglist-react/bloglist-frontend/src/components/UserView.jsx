import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const UserView = () => {
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await axios.get(`/api/users/${id}`);
      return response.data;
    },
  });

  if (isLoading) return <div>Loading user details...</div>;
  if (isError) return <div>Error loading user details.</div>;

  return (
    <div style={{ padding: '1em' }}>
      <h2>{user.name}</h2>
      <h4>Blogs Added</h4>
      <ul>
        {user.blogs?.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
