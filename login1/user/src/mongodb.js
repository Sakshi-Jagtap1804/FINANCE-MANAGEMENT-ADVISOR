const mongoose = require('mongoose')

mongoose
  .connect('mongodb://0.0.0.0:27017/Investment')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error)
  })

const logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const LogInCollection = new mongoose.model('LogInCollection', logInSchema)

module.exports = LogInCollection
