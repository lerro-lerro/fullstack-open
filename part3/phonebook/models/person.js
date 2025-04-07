const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required'],
    minlength: [3, 'Name must be at least 3 characters long']
  },
  number: {
    type: String,
    required: [true, 'Number required'],
    validate: {
      validator: function (v) {
        return v && v.length >= 8 && /^[0-9]{2,3}-[0-9]+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number! It should be of the form XX-XXXXXXX or XXX-XXXXXXXX.`
    }
  },
  important: Boolean,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
