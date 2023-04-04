Peticion = require('../../models/peticion');

// Endpoints
function home(req, res) {
    res.status(200).send({
        message: 'Hola mundo desde peticionesController'
    });
}

function pruebas(req, res) {
    console.log(req, res);

    res.status(200).send({
        message: 'Post realizado correctamente a peticionesController'
    });
}

module.exports = {home, pruebas}