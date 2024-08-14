const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')

app.use(cors())

mongoose
  .connect('mongodb://0.0.0.0:27017/Investment')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error)
  })
app.use(express.static(__dirname))
app.use(cors())

const investmentSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  interest: Number,
  Risk: String,
  Maturity: Number,
  Min_Age: Number,
  Gender: String,
  Max_Age: Number,
  Max_Amount: Number,
})

const option = mongoose.model('option', investmentSchema)
const corsOptions = {
  origin: 'http://localhost:5503',
  methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
  credentials: true,
}
app.get('/api/options', async (req, res) => {
  try {
    const { Risk, interest, Gender } = req.query
    const optionsQuery = { Risk }

    // Add interest filtering if provided
    if (interest) {
      if (interest === 'lte5') {
        optionsQuery.interest = { $lte: 5 }
      } else if (interest === 'gt5') {
        optionsQuery.interest = { $gt: 5 }
      }
    }

    // Add gender filtering if provided
    if (Gender) {
      if (Gender === 'Female') {
        optionsQuery.Gender = { $in: ['Female', 'Both'] }
      } else if (Gender === 'Male') {
        optionsQuery.Gender = { $in: ['Both'] }
      } else if (Gender === 'Both') {
        optionsQuery.Gender = { $in: ['Both'] }
      }
    }

    const options = await option.find(optionsQuery)
    res.json(options)
  } catch (error) {
    console.error('Error fetching options:', error)
    res.status(500).json({ error: 'Failed to fetch options' })
  }
})
app.get('/risk', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/', (req, res) => {
  res.send('hi')
})
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
