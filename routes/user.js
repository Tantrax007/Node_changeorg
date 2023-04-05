let express = require("express")

let UserController = require("../controllers/user")

let api = express.Router()

//routes
api.get("/home",UserController.home)
api.get("/pruebas",UserController.pruebas)
api.post("/saveuser",UserController.saveUser)
api.get("/getuser/:page",UserController.getUsers)
api.get("/login",UserController.login)
module.exports = api