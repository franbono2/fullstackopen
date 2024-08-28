import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification.value);

  return (
    <div>
      <h2>{notification}</h2>
    </div>
  );
};

export default Notification;
