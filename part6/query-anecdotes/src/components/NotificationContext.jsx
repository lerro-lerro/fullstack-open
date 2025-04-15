import { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export const NotificationProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, '');
  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationContext;
