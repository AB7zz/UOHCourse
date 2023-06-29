const mongoose = require('mongoose')
const {MONGODB_URI} = require('./utils/config.js')
const express = require('express')
const app = express()
const cors = require('cors')
const {requestLogger, unknownEndpoint, errorHandler} = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs.js')
const loginRouter = require('./controllers/login.js')
const usersRouter = require("./controllers/users.js");
const logger = require('./utils/logger.js')


mongoose.set('strictQuery', false)

mongoose.connect(MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/user', usersRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app