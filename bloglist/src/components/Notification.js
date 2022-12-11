import { useDispatch, useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification.message === null || notification.message === "") return null

  return notification.error ? (
    <p className="error">{notification.message}</p>
  ) : (
    <p className="notification">{notification.message}</p>
  )
}

export default Notification
