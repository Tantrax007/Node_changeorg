const { application } = require("express");
const { default: mongoose } = require("mongoose");

app = require('./app')
port = 3800

// Conexion con la base de datos
mongoose.Promise = global.Promise
mongoose.connect(
    'mongodb://mongoadmin:secret@localhost:27017', 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        () => {
            console.log('La conexion a la base de datos se ha realizado correctamente')
            app.listen(port, () => {console.log('Servidor corriendo en http://localhost:3800')})
        }
    )
    .catch(error => console.log(error))

