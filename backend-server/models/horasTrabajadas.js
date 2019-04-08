var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var horasTrabajadasSchema = new Schema({
    cantidad: { type: Number, required: [true, 'La cantidad es necesario'] },
    desde: { type: String, required: [true, 'Desde es necesario'] },
    hasta: { type: String, required: [true, 'Hasta es necesario'] },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto'
    },
    actividad: {
        type: Schema.Types.ObjectId,
        ref: 'Actividad'
    }
}, { collection: 'horasTrabajadas' });

module.exports = mongoose.model('HorasTrabajadas', horasTrabajadasSchema);