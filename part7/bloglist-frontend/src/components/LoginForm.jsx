import { useState } from "react";
import { useDispatch } from "react-redux";
import { logUser } from "../reducers/userReducer";
import { notify } from "../reducers/notificationReducer";
import { Box, TextField, Button } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    try {
      dispatch(logUser(user));
      dispatch(notify("log in succeed", 5));
    } catch (error) {
      console.error(error);
      dispatch(notify("wrong username or password", 5));
    }
    setUsername("");
    setPassword("");
  };

  const formStyle = {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const marginBottom = {
    marginBottom: 10,
  };

  return (
    <Box component="form" style={formStyle} onSubmit={handleLogin}>
      <TextField
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        variant="filled"
        label="Username"
        style={marginBottom}
      />
      <TextField
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        variant="filled"
        label="Password"
        style={marginBottom}
      />
      <Button variant="contained" id="login-button" type="submit">
        login
      </Button>
    </Box>
  );
};

export default LoginForm;
