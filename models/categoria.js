mongoose = require('mongoose');

Schema = mongoose.Schema;

CategoriaSchema = Schema({
nombre: String,
});
module.exports = mongoose.model('Categoria', CategoriaSchema);