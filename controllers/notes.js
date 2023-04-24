const notesRotuer = require('express').Router()
const Note        = require('../models/note')
 

notesRotuer.get("/notes", (req, res) => {

  Note.find({}).then(notes =>{
    res.json(notes)
  })

  
})

notesRotuer.get("/info/:id", (req, res,next) => {
  Note.findById(req.params.id).then(note=>{
   if(note){
     res.json(note)
   }else{
     res.status(404).end()
   }
   }).catch(error => next(error))
 
 })

 
notesRotuer.get("/info", (req, res) => {
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


notesRotuer.delete("/notes/:id", (req, res,next) => {
   Note.findByIdAndDelete(req.params.id)
   .then(() =>{
    res.status(204).end()
   })
   .catch(error=>next(error))
});

 

notesRotuer.post("/notes", (req, res,next) => {
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

notesRotuer.put("/notes/:id", (request, response, next) => {
   
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

module.exports = notesRotuer