interface Props {
    message: string | null;
  }
  
  const Notification = ({ message }: Props) =>
    message ? (
      <div style={{ color: 'red', border: '1px solid', padding: '0.5rem' }}>
        {message}
      </div>
    ) : null;
  
  export default Notification;
  