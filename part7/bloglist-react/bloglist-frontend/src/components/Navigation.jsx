import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import blogService from '../services/blogs';

const Navigation = () => {
  const { user, userDispatch } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    userDispatch({ type: 'LOGOUT' });
    blogService.setToken(null);
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1em', backgroundColor: '#333', color: 'white' }}>
      <Link to="/" style={{ marginRight: '1em', color: 'white' }}>
        Blogs
      </Link>
      <Link to="/users" style={{ marginRight: '1em', color: 'white' }}>
        Users
      </Link>
      {user ? (
        <>
          <span style={{ marginRight: '1em' }}>{user.name} logged in</span>
          <button onClick={handleLogout} style={{ padding: '0.5em' }}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login" style={{ color: 'white' }}>
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
