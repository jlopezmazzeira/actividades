var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{PATH} no es un rol permitido'
}

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    correo: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    username: { type: String, unique: true, required: [true, 'El username es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesario'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos },
    proyectos: [{ type: Schema.Types.ObjectId, ref: 'Proyecto' }]
});

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} debe ser único' })

module.exports = mongoose.model('Usuario', usuarioSchema);