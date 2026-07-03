const mongoose = require('mongoose')

const url =
  'mongodb+srv://narveayesha_db_user:n4W2Uk7dqe20WzNJ@cluster0.kijryrs.mongodb.net/phonebookApp?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

module.exports = mongoose.model('Person', personSchema)