const mongoose = require('mongoose')
const Person = require('./models/person')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')

    if (process.argv.length === 3) {
      Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
      })
    } else if (process.argv.length === 5) {
      const name = p
      rocess.argv[3]
      const number = process.argv[4]

      const person = new Person({
        name: name,
        number: number,
      })

      person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
      })
    } else {
      console.log('wrong number of arguments')
      mongoose.connection.close()
    }
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })
