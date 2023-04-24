const logger = require('./logger')

const requestLogger = (req,res, next) =>{
    logger.info('Method:', req.method)
    logger.info('Path:  ', req.path)
    logger.info('Body:  ', req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req,res) =>{
    res.status(404).send({error: 'Endpoint desconocido'})
}

const errorHandler = (req,res) =>{
    logger.error(error.message)

    if (error.name === 'Error de casting') {
        return response.status(400).send({ error: 'mal formato de id' })
      } else if (error.name === 'Error de validación de datos') {
        return response.status(400).json({ error: error.message })
      }
    
      next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
  }