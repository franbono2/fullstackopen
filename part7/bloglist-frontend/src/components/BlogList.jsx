import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const sortByLikes = (blogs) => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  };
  const blogs = useSelector((state) => sortByLikes(state.blogs));

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {blogs.map((blog) => (
        <ListItem key={blog.id}>
          <ListItemButton
            component={Link}
            color="inherit"
            to={`/blogs/${blog.id}`}
          >
            <ListItemText>{blog.title}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default BlogList;
