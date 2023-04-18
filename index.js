
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
 
const Note = require('./models/note')

app.use(express.json())
app.use(cors())
app.use(express.static("dists"));

 
 


morgan.token("data", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : " "
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))



app.get("/api/notes", (req, res) => {

  Note.find({}).then(notes =>{
    res.json(notes)
  })

  
})

app.get("/api/info/:id", (req, res,next) => {
  Note.findById(req.params.id).then(note=>{
   if(note){
     res.json(note)
   }else{
     res.status(404).end()
   }
   }).catch(error => next(error))
 
 })

// para arreglar
app.get("/api/info", (req, res) => {
  Note.find({})
    .then((Note) => 
    {res.send(
        `<p>La cantidad de personas es 
        ${Note.length}
         </p><p>${new Date()}</p>`
      );
    })
    .catch((error) => next(error));

})


app.delete("/api/notes/:id", (req, res,next) => {
   Note.findByIdAndDelete(req.params.id)
   .then(() =>{
    res.status(204).end()
   })
   .catch(error=>next(error))
});

 

app.post("/api/notes", (req, res,next) => {
 const {name, number} = req.body
 

 
const  note = new Note({
  name: name,
  number: number,
})

if(name == Note.name){
  res.status(400).json({error:"Maestro este nombre ya existe"})
 }

note.save().then(savedNote=> savedNote.toJSON()) 
.then(savedAndFormattedNote =>{
  res.json(savedAndFormattedNote)
})
.catch(error => next(error))
})

app.put("/api/notes/:id", (request, response, next) => {
   
  const { name, number } = request.body;

  Note.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'esta ruta no existe capo' })
}


app.use(unknownEndpoint)

const Errores = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'mal formato de id' })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message, msg: "por favor ingrese un nombre concha su madre" });
  }

  next(error)
}

app.use(Errores)





const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`el servidor esta escuchando en el puerto: ${PORT}`)
})
