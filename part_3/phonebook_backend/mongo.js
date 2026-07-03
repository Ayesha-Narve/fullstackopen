const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://narveayesha_db_user:${password}@cluster0.kijryrs.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB')

    // If only password is provided, list all persons
    if (process.argv.length === 3) {
      console.log('phonebook:')

      return Person.find({})
        .then(persons => {
          persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
          })

          mongoose.connection.close()
        })
    }

    // If password, name and number are provided, add a person
    if (process.argv.length === 5) {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      })

      return person.save()
        .then(result => {
          console.log(`added ${result.name} number ${result.number} to phonebook`)
          mongoose.connection.close()
        })
    }

    console.log('Usage:')
    console.log('node mongo.js <password>')
    console.log('or')
    console.log('node mongo.js <password> "Name" "Number"')
    mongoose.connection.close()
  })
  .catch(error => {
    console.log('Connection error:')
    console.log(error.message)
    mongoose.connection.close()
  })