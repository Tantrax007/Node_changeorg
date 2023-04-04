const user = require('../../models/user');

User = require('../../models/user')

// Endpoints

function saveUser(req, res){
    params = req.body
    user = new User()
    if (params.name && params.email && params.password){
        user.name = params.name
        user.email = params.email
        user.password = params.password
        user.role = 'ROLE_USER'
        user.image = null
        User.find({$or: [{email: user.email.toLowerCase()}]}).exec((err, users) => {
            console.log(users);
            if(err){
                res.status(500).send({message: 'Error en la petición de usuarios'})
            }
            if (users && users.length >= 1){
                return res.status(400).send({message: 'El usuario que intentas registrar ya existe'})
            }
        })
    } else{
        res.status(200).send({
            message: 'Envia todos los campos necesarios'
        })
    }
}

function home(req, res) {
    res.status(200).send({
        message: 'Hola mundo desde userController'
    });
}

function pruebas(req, res) {
    console.log(req, res);

    res.status(200).send({
        message: 'Post realizado correctamente a userController'
    });
}

module.exports = {home, pruebas}