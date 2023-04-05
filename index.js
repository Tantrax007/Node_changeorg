let moongose = require('mongoose')
let app = require('./app')
let port = 3800

moongose.Promise = global.Promise;
moongose.connect('mongodb://mongoadmin:secret@localhost:27017', {
    useNewUrlParser: true
})
.then(() => {
    console.log("Conectado a la BBDD");
    app.listen(port, () => {
        console.log('Servidor en marcha')
        });
})
.catch(err => console.log(err));