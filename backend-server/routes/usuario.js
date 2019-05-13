var express = require('express');
var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Usuario = require('../models/usuario');

// =====================================
// OBTENER TODOS LOS USUARIOS  
// =====================================
app.get('/', mdAutenticacion.verificaToken, (req, resp, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Usuario.find({}, 'nombre correo username img role')
        .skip(desde)
        .limit(10)
        .populate('proyectos', 'codigo nombre _id')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return resp.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarios',
                        errors: err
                    });
                }

                Usuario.count({}, (err, conteo) => {
                    resp.status(200).json({
                        ok: true,
                        usuarios: usuarios,
                        total: conteo
                    });
                });
            }
        );
});

// =====================================
// CREAR USUARIO  
// =====================================
//app.post('/', mdAutenticacion.verificaToken, (req, resp) => {
app.post('/', (req, resp) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        correo: body.correo,
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        resp.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        });

    });

});

// =====================================
// OBTENER USUARIO
// =====================================
app.get('/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    Usuario.findById(id)
        .populate('proyectos')
        .exec((err, usuario) => {
            if (err) {
                return resp.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                });
            }

            if (!usuario) {
                return resp.status(400).json({
                    ok: false,
                    mensaje: 'El usuario con el id ' + id + ' no existe',
                    errors: { message: 'No existe el usuario con ese ID' }
                });
            }

            usuario.password = ':)';

            return resp.status(200).json({
                ok: true,
                usuario: usuario
            });
        });
});

// =====================================
// ACTUALIZAR USUARIO  
// =====================================
app.put('/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe el usuario con ese ID' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.correo = body.correo;
        usuario.username = body.username;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return resp.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            resp.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });

});

// =====================================
// ELIMINAR USUARIO  
// =====================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe el usuario con ese ID' }
            });
        }

        resp.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});

// =====================================
// ACTUALIZAR CONTRASEÑA  
// =====================================
app.put('/cambiar-password/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe el usuario con ese ID' }
            });
        }

        usuario.password = bcrypt.hashSync(body.password, 10);

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return resp.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            resp.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });

});
// =====================================
// ASIGNAR PROYECTOS USUARIO  
// =====================================
app.put('/asignar-proyectos/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    var body = req.body;

    var proyecto = body.proyecto;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe el usuario con ese ID' }
            });
        }

        usuario.proyectos.push(proyecto);

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return resp.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            resp.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });

});

// =====================================
// Eliminar PROYECTO ASIGNADO
// =====================================
app.put('/eliminar-proyecto/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    var body = req.body;

    var proyecto = body.proyecto;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe el usuario con ese ID' }
            });
        }

        var index =  usuario.proyectos.indexOf(proyecto);
        if (index > -1) {
            usuario.proyectos.splice(index, 1);
        }

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return resp.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            resp.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });

});
module.exports = app;