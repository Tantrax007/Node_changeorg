'use strict'

var jwt = require("jwt-simple")
var moment = require("moment")
var secret_salt = "hola"
exports.ensureAuth= function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({
            message:"La peticion no tiene autentificacion"
        })
    }
    var token = req.headers.authorization.replace('/[\'\']+/g','')
}