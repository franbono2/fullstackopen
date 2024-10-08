const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (_request, response) => {
  Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .then((blogs) => {
      response.json(blogs);
    });
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user.id,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  });

  const blogSaved = await blog.save();
  const result = await Blog.findById(blogSaved._id).populate("user", {
    username: 1,
    name: 1,
  });
  user.blogs = user.blogs.concat(blogSaved._id);
  await user.save();

  response.status(201).json(result);
});

blogRouter.post("/:id/comments", async (request, response) => {
  const { comment } = request.body;
  const id = request.params.id;
  const blog = await Blog.findById(id);
  const commentedBlog = {
    comments: blog.comments.concat(comment),
  };
  const updatedBlog = await Blog.findByIdAndUpdate(id, commentedBlog, {
    new: true,
  })
    .populate("user", { username: 1, name: 1 })
    .exec();
  response.json(updatedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const user = request.user;
  const blog = await Blog.findById(id);

  if (!(user.id.toString() === blog.user.toString())) {
    return response
      .status(403)
      .json({ error: "unauthorized to delete this blog" });
  }

  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const { title, author, url, likes } = request.body;
  const newBlog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, {
    new: true,
  })
    .populate("user", { username: 1, name: 1 })
    .exec();
  response.json(updatedBlog);
});

module.exports = blogRouter;
