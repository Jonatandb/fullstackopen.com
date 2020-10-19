/* eslint-disable no-undef */
const mongoose = require('mongoose')

let paramsCount = process.argv.length

if (paramsCount === 2 || paramsCount === 4 || paramsCount > 5) {
  console.log('Please provide the password as an argument, next (optional) the name and the number: \n node mongo.js <password> "firstname lastname" number \n\n If you just want to list all records run:\n node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

let name = process.argv[3]

let number = process.argv[4]

if (paramsCount === 5) {
  if (!name || name && name.trim().length === 0) {
    console.log('Name can\'t be empty')
    process.exit(1)
  }

  if (!number || number && number.trim().length === 0) {
    console.log('Number can\'t be empty')
    process.exit(1)
  }
}

const url =
    `mongodb+srv://fullstack:${password}@phonebook-cluster-0.pujwt.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (paramsCount === 3) {

  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })

} else {

  const person = new Person({
    name,
    number
  })

  person.save().then(() => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })

}
