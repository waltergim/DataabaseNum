const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Por favor proporcione la contraseña como argumento: node mongo.js <contraseña>')
    process.exit(1)
  }
  const password = process.argv[2]
  const name     = process.argv[3]
  const number   = process.argv[4]
  const date     = new Date()
  

const url =
  `mongodb+srv://waltergim49:${password}@cluster0.ahbu5mg.mongodb.net/fullstak?retryWrites=true&w=majority`
 
mongoose.connect(url)

const notesSchema = new mongoose.Schema({
    name: String,
    number: Number,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', notesSchema)

if(process.argv.length === 3){
Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}
if(process.argv.length > 3){
const note = new Note({
  name: name,
  number: number,
  date: date,
  important: true,
})

note.save().then(result => {
  console.log('Nota guardada correctamente!')
  console.log(`añadiste ${name} tu numero es ${number} `)
  mongoose.connection.close()
})

}