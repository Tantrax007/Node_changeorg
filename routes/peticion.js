express = require('express')

PeticionController = require('../controllers/peticiones_controllers/peticiones_controller')

api = express.Router()

api.get('/home', PeticionController.home)
api.post('/pruebas', PeticionController.pruebas)

module.exports = api