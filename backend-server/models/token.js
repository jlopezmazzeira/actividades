var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
    usuario: { type: String, unique: true, required: [true, 'El usuario es necesario'] },
    token: { type: String, unique: true, required: [true, 'El token es necesario'] },
    vence: { type: Date, required: [true, 'La fecha es necesaria'] }
}, { collection: 'tokens' });

module.exports = mongoose.model('Token', tokenSchema);