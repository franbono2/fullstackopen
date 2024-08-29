import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const users = useSelector((state) => state.users);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  const userListStyle = {
    marginTop: 15,
  };

  const tdStyle = {
    textAlign: "center",
  };

  return (
    <div style={userListStyle}>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td style={tdStyle}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
