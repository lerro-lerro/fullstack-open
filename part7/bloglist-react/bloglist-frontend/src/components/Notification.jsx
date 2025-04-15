import PropTypes from 'prop-types';

const Notification = ({ notification }) => {
  if (!notification) return null;

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    backgroundColor: '#eee',
    padding: 10,
    margin: 10,
    border: '1px solid',
    borderRadius: 5,
  };

  return (
    <div
      className={notification.type === 'error' ? 'error' : 'success'}
      style={style}
    >
      {notification.message}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }),
};

export default Notification;
