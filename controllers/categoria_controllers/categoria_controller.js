Categoria = require('../../models/categoria');

// Endpoints
function home(req, res) {
    res.status(200).send({
        message: 'Hola mundo desde categoriaController'
    });
}

function pruebas(req, res) {
    console.log(req, res);

    res.status(200).send({
        message: 'Post realizado correctamente a categoriaController'
    });
}

module.exports = {home, pruebas}