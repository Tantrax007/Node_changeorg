let express = require("express")

let UserController = require("../controllers/user")

let auth = require("../middleware/authentication")

let api = express.Router()

api.get("/home",UserController.home)
api.get("/pruebas",UserController.pruebas)
api.post("/saveuser",UserController.saveUser)
api.get("/getuser/:page",auth.ensureAuth, UserController.getUsers)
api.post("/login", UserController.login)
api.put("/update", auth.ensureAuth, UserController.updateUser)
api.delete("/delete", auth.ensureAuth, UserController.updateUser)
module.exports = api