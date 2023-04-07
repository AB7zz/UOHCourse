import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const password = process.argv[2]
const Name = process.argv[3]
const Number = process.argv[4]

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.set('strictQuery',false)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Persons', personSchema)

export default Person