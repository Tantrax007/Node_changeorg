User = require('../../models/user');

// Endpoints
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