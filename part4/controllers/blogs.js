const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blogs.js')

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


module.exports = blogsRouter