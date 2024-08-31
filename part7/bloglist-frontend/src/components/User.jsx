import { Typography } from "@mui/material";

const User = ({ user }) => {
  if (!user) return null;

  return (
    <div>
      <Typography
        color="primary"
        variant="h5"
        component="h2"
        style={{ marginTop: 10 }}
      >
        {user.name}
      </Typography>
      <Typography variant="h6" component="h3" style={{ marginTop: 10 }}>
        Added blogs:
      </Typography>
      <ul>
        {user.blogs.map((blog) => (
          <Typography key={blog.id} variant="body2" component="li">
            {blog.title}
          </Typography>
        ))}
      </ul>
    </div>
  );
};

export default User;
