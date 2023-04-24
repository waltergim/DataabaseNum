const app    = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`el servidor esta escuchando en el puerto: ${PORT}`)
})
