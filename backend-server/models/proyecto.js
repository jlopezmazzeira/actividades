var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proyectoSchema = new Schema({
    codigo: { type: String, unique: true, required: [true, 'El código es necesario'] },
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    actividades: [{ type: Schema.Types.ObjectId, ref: 'Actividad' }]
}, { collection: 'proyectos' });

module.exports = mongoose.model('Proyecto', proyectoSchema);