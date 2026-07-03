const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },

  number: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{2,3}-\d+$/.test(value) && value.length >= 8
      },
      message: props => `${props.value} is not a valid phone number`
    }
  }
})

module.exports = mongoose.model('Person', personSchema)