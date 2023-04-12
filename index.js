require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

 
const Note = require('./models/note')


app.use(cors())
app.use(express.json())
app.use(morgan("tiny"));
app.use(express.static("dist"));

 
 


morgan.token("data", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : " "
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

 

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'esta ruta no existe capo' })
}


 

app.get("/api/notes", (req, res) => {

  Note.find({}).then(notes =>{
    res.json(notes)
  })

  
})

app.get("/api/info", (req, res) => {
  const hora = new Date().getHours()
  const Angeda = notes.reduce((counter, person) => {

    if (person.name) counter++;



    return counter

  }, 0);
  res.send(`La hora a la que se recibio la peticion fue : ${hora}hs la cantidad de angendas es ${Angeda}`)

})

app.get("/api/info/:id", (req, res) => {
 Note.findById(req.params.id).then(note=>{
  res.json(note)
 })
})

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end("se elimino correctamente");
});

 

app.post("/api/notes", (req, res) => {
 const body = req.body
 if(body.name === undefined){
  return res.status(400).json({
    error: "Contenido ausente"
  })
 }

const  note = new Note({
  name:body.name,
  number: body.number,
  important:body.important || false,
})

note.save().then(savedNote=>{
  res.json(savedNote)
})

})



app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`el servidor esta escuchando en el puerto: ${PORT}`)
})
