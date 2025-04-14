import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (!notification) return null

  const notificationStyle = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const className = notification.type === 'error' ? 'error' : 'success'

  return (
    <div style={notificationStyle} className={className}>
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  })
}

export default Notification
