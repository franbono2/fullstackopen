const Notification = ({ message } : { message: string }) => {

  return (
    <p style={{ color: 'red' }}>{message}</p>
  );
};

export default Notification;