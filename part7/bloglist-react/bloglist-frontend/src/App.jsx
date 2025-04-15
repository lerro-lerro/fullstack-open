import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './contexts/UserContext';
import { useNotification } from './contexts/NotificationContext';
import Navigation from './components/Navigation';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import BlogView from './components/BlogView';
import Users from './components/Users';
import UserView from './components/UserView';

const App = () => {
  const { user } = useUser();
  const { notification } = useNotification();

  return (
    <div>
      <Navigation />
      {notification && <Notification notification={notification} />}
      <Routes>
        <Route path="/" element={user ? <BlogList /> : <LoginForm />} />
        <Route
          path="/login"
          element={!user ? <LoginForm /> : <Navigate replace to="/" />}
        />
        <Route
          path="/blogs/:id"
          element={user ? <BlogView /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/users/:id"
          element={user ? <UserView /> : <Navigate replace to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
