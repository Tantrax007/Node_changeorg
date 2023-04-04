express = require('express')

CategoriaController = require('../controllers/categoria_controllers/categoria_controller')

api = express.Router()

api.get('/home', CategoriaController.home)
api.post('/pruebas', CategoriaController.pruebas)

module.exports = api