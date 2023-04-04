express = require('express')

UserController = require('../controllers/user_controllers/userController.js')

api = express.Router()

api.get('/home', UserController.home)
api.post('/pruebas', UserController.pruebas)

module.exports = api