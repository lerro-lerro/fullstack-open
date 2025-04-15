import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNotification } from '../contexts/NotificationContext';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { userDispatch } = useUser();
  const { dispatch: notificationDispatch } = useNotification();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({ type: 'SET_USER', payload: user });

      setUsername('');
      setPassword('');
      notificationDispatch({
        type: 'SET',
        payload: { message: `Welcome ${user.name}`, type: 'success' },
      });
      setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000);
    } catch (error) {
      notificationDispatch({
        type: 'SET',
        payload: { message: 'Wrong credentials', type: 'error' },
      });
      setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000);
    }
  };

  return (
    <div style={{ padding: '1em' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '0.5em' }}>
          <label>Username&nbsp;</label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div style={{ marginBottom: '0.5em' }}>
          <label>Password&nbsp;</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          log in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
