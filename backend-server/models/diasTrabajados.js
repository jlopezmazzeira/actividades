var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var diasTrabajadasSchema = new Schema({
    dia: { type: Date, required: [true, 'La fecha es necesaria'] },
    horasTrabajadas: [{
        type: Schema.Types.ObjectId,
        ref: 'HorasTrabajadas'
    }],
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, { collection: 'diasTrabajados' });

module.exports = mongoose.model('DiasTrabajados', diasTrabajadasSchema);