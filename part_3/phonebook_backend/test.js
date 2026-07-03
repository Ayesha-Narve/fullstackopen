const mongoose = require('mongoose')

const password = 'YOUR_DATABASE_PASSWORD'

mongoose.connect(
  `mongodb+srv://narveayesha_db_user:${password}@cluster0.kijryrs.mongodb.net/test?retryWrites=true&w=majority`
)
.then(() => {
  console.log('Connected!')
  mongoose.connection.close()
})
.catch(err => {
  console.log(err)
})