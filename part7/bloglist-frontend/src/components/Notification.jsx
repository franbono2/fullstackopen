import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification.value);

  return (
    <Typography
      style={{ marginTop: 5 }}
      variant="h5"
      component="h2"
      sx={{ flexGrow: 1 }}
      color="secondary"
    >
      {notification}
    </Typography>
  );
};

export default Notification;
