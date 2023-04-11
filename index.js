const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan("tiny"));
app.use(express.static("dist"));

morgan.token("data", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : " "
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let notes = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },

];

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'esta ruta no existe capo' })
}


app.get("/", (req, res) => {
  res.send('<h1>Hola como estan<h1/>')
})

app.get("/api/notes", (req, res) => {
  res.json(notes)
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
  const id = req.params.id
  const note = notes.find(note => note.id == id)
  if (note) {

    res.json(note)
  } else {
    res.send("Esta id no existe.Porfavor ingrese una id valida")
  }
})

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end("se elimino correctamente");
});

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post("/api/notes", (req, res) => {
  const note = req.body

  if (!note.name) {
    return res.status(400).send("<h1>Hola querido amigo. Este archivo que intenas enviar no posee el nombre, por favor ingresalo <h1/>")
  }

  const newNote = {
    name: note.name,
    date: new Date(),
    id: generateId()
  }

  notes = notes.concat(newNote)


  res.json(note)
})



app.use(unknownEndpoint)

const PUERTO = process.env.PUERTO || 534
app.listen(PUERTO, () => {
  console.log(`el servidor esta escuchando en el puerto: ${PUERTO}`)
})