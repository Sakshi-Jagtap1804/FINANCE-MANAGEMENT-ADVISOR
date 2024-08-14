const mongoose = require('mongoose')
const express = require('express')

const app = express()
mongoose
  .connect('mongodb://127.0.0.1:27017/Investment1')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error)
  })
const fundSchema = new mongoose.Schema({
  Name: String,
  Category: String,
  SubCategory: String,
  Plan: String,
  CAGR3Y: Number,
  ExpenseRatio: Number,
})

const Fund = mongoose.model('Fund', fundSchema)
const createDocument = async () => {
  try {
    const mutualFunds = new Fund({
      Name: 'Parag Parikh Flexi Cap Fund',
      Category: 'Equity',
      SubCategory: 'Flexi Cap Fund',
      Plan: 'growth',
      CAGR3Y: 23.43,
      ExpenseRatio: 0.57,
    })

    const result = await Fund.insertMany([mutualFunds])
  } catch (error) {
    console.log(error)
  }
}
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

createDocument()
