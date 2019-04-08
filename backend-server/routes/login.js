var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();

var Usuario = require('../models/usuario');

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

function obtenerMenu(ROLE) {
    var menu = [{
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Dashboard', url: '/dashboard' },
                { titulo: 'Actividades', url: '/dashboard' }
            ]
        },
        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Actvidades', url: '/actividades' },
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