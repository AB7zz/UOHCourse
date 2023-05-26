const listHelper = require('../utils/list_helper.js')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs.js')
require('express-async-errors')

const api = supertest(app)


const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]


beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = blogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 100000)


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
}, 100000)

describe('when there is initially some blogs saved', () => {  
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('there are 6 blogs', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(6)
  })

  test('id is defined', async() => {
    const blogPost = new Blog(blogs[0])

    const blogPostJSON = blogPost.toJSON()

    expect(blogPostJSON.id).toBeDefined()

  })
})

describe('total likes', () => {
    test('of empty list is zero', () => {
      const result = listHelper.totalLikes([])
      expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  
    test('of a bigger list is calculated right', () => {
      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(36)
    })
})


describe('favorite blog', () => {
  test('of a bigger list' , () => {
    const result = listHelper.favoriteBlog(blogs)
    const answer = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(result).toEqual(answer)
  })
})

describe('most blogs', () => {
  test('of a bigger list' , () => {
    const result = listHelper.mostBlogs(blogs)
    const answer = {
      author: "Robert C. Martin",
      blogs: 3
    }
    expect(result).toEqual(answer)
  })
})

describe('most likes', () => {
  test('of a bigger list' , () => {
    const result = listHelper.mostLikes(blogs)
    const answer = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    expect(result).toEqual(answer)
  })
})