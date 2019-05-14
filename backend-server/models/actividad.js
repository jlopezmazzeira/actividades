var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var actividadSchema = new Schema({
    nombre: { type: String, unique: true, required: [true, 'El nombre es necesario'] },
    asignada: { type: Boolean, required: false, default: false },
}, { collection: 'actividades' });

module.exports = mongoose.model('Actividad', actividadSchema);