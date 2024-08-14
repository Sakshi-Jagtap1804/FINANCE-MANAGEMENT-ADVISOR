const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const LogInCollection = require('./mongodb')
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const templatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.set('views', templatePath)
app.use(express.static(publicPath))

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/home', (req, res) => {
  res.render('home')
})

app.post('/signup', async (req, res) => {
  try {
    const existingUser = await LogInCollection.findOne({ name: req.body.name })
    if (existingUser) {
      return res.send('User details already exist')
    }
    const newUser = new LogInCollection({
      name: req.body.name,
      password: req.body.password, // This should be hashed
    })
    await newUser.save()
    res.redirect('http://127.0.0.1:5502/index.html?success=signup successful!')
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})

app.post('/login', async (req, res) => {
  try {
    const user = await LogInCollection.findOne({ name: req.body.name })
    if (!user) {
      return res.send('User not found')
    }
    // You should compare hashed passwords here
    if (user.password === req.body.password) {
      // Redirect to the home page
      res.redirect('http://127.0.0.1:5502/index.html?success=Login successful!')
    } else {
      return res.send('Incorrect password')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})

app.listen(port, () => {
  console.log('Server connected on port', port)
})
