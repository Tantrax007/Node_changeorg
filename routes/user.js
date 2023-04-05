'use strict'

var express = require("express")

var UserController = require("../controllers/user")

var api = express.Router()

//routes
api.get("/home",UserController.home)
api.get("/pruebas",UserController.pruebas)
api.post("/saveuser",UserController.saveUser)
api.get("/getuser/:page",UserController.getUsers)
api.get("/login",UserController.login)
module.exports = api