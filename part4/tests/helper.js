const Blog = require("../models/blogs.js");

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

module.exports = { blogsInDb };