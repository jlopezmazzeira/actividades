var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Actividad = require('../models/actividad');

// =====================================
// OBTENER TODOS LOS ACTIVIDADES
// =====================================
app.get('/', (req, resp, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Actividad.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, actividades) => {
                if (err) {
                    return resp.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando actividades',
                        errors: err
                    });
                }

                Actividad.count({}, (err, conteo) => {
                    resp.status(200).json({
                        ok: true,
                        actividades: actividades,
                        total: conteo
                    });
                });
            }
        );
});

// =====================================
// CREAR ACTIVIDAD
// =====================================
app.post('/', mdAutenticacion.verificaToken, (req, resp) => {

    var body = req.body;

    var actividad = new Actividad({
        nombre: body.nombre
    });

    actividad.save((err, actividadGuardado) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Error al crear actividad',
                errors: err
            });
        }

        resp.status(201).json({
            ok: true,
            actividad: actividadGuardado,
            usuarioToken: req.usuario
        });

    });

});

// =====================================
// ACTUALIZAR ACTIVIDAD
// =====================================
app.put('/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    var body = req.body;

    Actividad.findById(id, (err, actividad) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al buscar actividad',
                errors: err
            });
        }

        if (!actividad) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'La actividad con el id ' + id + ' no existe',
                errors: { message: 'No existe la actividad con ese ID' }
            });
        }

        actividad.nombre = body.nombre;

        actividad.save((err, actividadGuardado) => {
            if (err) {
                return resp.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar actividad',
                    errors: err
                });
            }

            resp.status(200).json({
                ok: true,
                actividad: actividadGuardado
            });

        });

    });

});

// =====================================
// ELIMINAR ACTIVIDAD
// =====================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    Actividad.findByIdAndRemove(id, (err, actividadBorrado) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al borrar actividad',
                errors: err
            });
        }

        if (!actividadBorrado) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'La actividad con el id ' + id + ' no existe',
                errors: { message: 'No existe la actividad con ese ID' }
            });
        }

        resp.status(200).json({
            ok: true,
            actividad: actividadBorrado
        });

    });

});

module.exports = app;