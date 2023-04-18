const mongoose = require('mongoose')
 


const url = process.env.MONGODB_URI

console.log('Connectado a la url : ', url)

mongoose.connect(url)
  .then(result => {
    console.log('Conectado a MongoDB')
  })
  .catch((error) => {
    console.log('Error no se pudo conectar a la base de datos de mongoose:', error.message)
  })

 
  
const notesSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      required: true,
    },
    number: {
      type: String,
      minlength: 8,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    important: Boolean,
  })
  
  notesSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Note', notesSchema)