import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserList = () => {
  const users = useSelector((state) => state.users);

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
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td style={tdStyle}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
