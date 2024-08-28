import { useState } from "react";
import { useDispatch } from "react-redux";
import { logUser } from "../reducers/userReducer";
import { notify } from "../reducers/notificationReducer";

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

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
