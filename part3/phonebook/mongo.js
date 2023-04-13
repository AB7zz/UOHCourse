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
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{2}-\d{6}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  }
})

const Person = mongoose.model('Persons', personSchema)

export default Person