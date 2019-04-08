var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var actividadSchema = new Schema({
    nombre: { type: String, unique: true, required: [true, 'El nombre es necesario'] }
}, { collection: 'actividades' });

module.exports = mongoose.model('Actividad', actividadSchema);