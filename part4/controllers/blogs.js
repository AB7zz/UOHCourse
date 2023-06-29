const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blogs.js')
const jwt = require('jsonwebtoken')
require('express-async-errors')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', async(request, response) => {
  if(!request.body.title || !request.body.url){
    response.status(400).json()
  }else{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const blog = await new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: request.body.user._id,
    }).populate("user", { username: 1, name: 1 });
  
    const savedBlog = await blog.save();
  
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog.toJSON());
  }
})

blogsRouter.delete('/:id', async(request, response) => {
  const id = request.params.id 
  const user = request.user
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const blog = await Blog.findById(id);

  if (blog.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: id });
    response.sendStatus(204).end();
  } else {
    response.status(401).json({ error: "unauthorized operation" });
  }
})

blogsRouter.put('/:id', async(request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
  const id = request.params.id
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  Blog.findByIdAndUpdate(id, blog, {new: true})
    .then(updatedBlog => {
      response.status(200).json(updatedBlog)
    })
    .catch(err => next(err))

})


module.exports = blogsRouter