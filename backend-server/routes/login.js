var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();

var Usuario = require('../models/usuario');
var Token = require('../models/token');

var mdAutenticacion = require('../middlewares/autenticacion');

// =====================================
// RENOVAR TOKEN
// =====================================
app.get('/renuevatoken', mdAutenticacion.verificaToken, (req, resp) => {
    var token = jwt.sign({ usuario: req.usuario }, SEED, { expiresIn: 14400 });

    resp.status(201).json({
        ok: true,
        token: token
    });
});

// =====================================
// LOGIN NORMAL
// =====================================
app.post('/', (req, resp) => {
    var body = req.body;

    Usuario.findOne({ correo: body.correo }, (err, usuarioDB) => {

        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas',
                errors: err
            });
        }

        usuarioDB.password = ':)';
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 });

        resp.status(201).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id,
            menu: obtenerMenu(usuarioDB.role)
        });
    });
});

// =====================================
// RESTABLECER CONTRASEÑA
// =====================================
app.put('/recover-password/:id', (req, resp) => {
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

            Token.findOneAndRemove({ usuario: id }, (err, tokenBorrado) => {
                if (err) {
                    return resp.status(500).json({
                        ok: false,
                        mensaje: 'Error al borrar token',
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
});

// =====================================
// VERIFICAR TOKEN EMAIL
// =====================================
app.post('/verificar-token/:id', (req, resp) => {
    var id = req.params.id;
    var body = req.body;
    var token_env = body.token;

    Token.findOne({ usuario: id, token: token_env }, (err, token) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Error al borrar token',
                errors: err
            });
        }

        if (!token) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Token inválido',
                errors: { message: 'No existe el token, debe solicitar uno nuevo' }
            });
        }

        var hoy = new Date();
        var vence = token.vence;

        if (hoy <= vence) {
            return resp.status(200).json({
                ok: true,
                mensaje: 'Token valido'
            });
        } else {
            Token.findOneAndRemove({ usuario: id }, (err, tokenBorrado) => {
                if (err) {
                    return resp.status(500).json({
                        ok: false,
                        mensaje: 'Error al borrar token',
                        errors: err
                    });
                }

                resp.status(400).json({
                    ok: false,
                    mensaje: 'Token invalido',
                    errors: err
                });

            });

        }

    });
});

function obtenerMenu(ROLE) {
    var menu = [{
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Dashboard', url: '/dashboard' },
                { titulo: 'Actividades', url: '/calendario' }
            ]
        },
        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Actividades', url: '/actividades' },
                { titulo: 'Proyectos', url: '/proyectos' }
            ]
        }
    ];

    if (ROLE === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/usuarios' });
    }
    return menu;
}

module.exports = app;