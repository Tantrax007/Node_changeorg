express = require('express')
bodyParser = require('body-parser')
user_routes = require('./routes/user')
peticion_routes = require('./routes/peticion')
categoria_routes = require('./routes/categoria')

app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/user', user_routes)
app.use('/api/peticion', peticion_routes)
app.use('/api/categoria', categoria_routes)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-RequestMethod')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

module.exports = app