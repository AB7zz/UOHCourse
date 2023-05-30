const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blogs.js')
require('express-async-errors')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', (request, response) => {
  if(!request.body.title || !request.body.url){
    response.status(400).json()
  }else{
    const blog = new Blog(request.body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }
})

blogsRouter.delete('/:id', async(request, response) => {
  const id = request.params.id 
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async(request, response) => {
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