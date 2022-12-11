const Notification = (props) => {
  const { notification } = props;
  if (notification.message === null || notification.message === "") return null;

  return notification.error ? (
    <p className="error">{notification.message}</p>
  ) : (
    <p className="notification">{notification.message}</p>
  );
};

export default Notification;
