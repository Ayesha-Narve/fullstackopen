const mongoose = require('mongoose')
const app = require('./app')

const mongoUrl = 'YOUR_MONGODB_CONNECTION_STRING'

mongoose.connect(mongoUrl)

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})