var express = require('express');
var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var HorasActvidades = require('../models/horasTrabajadas');
var DiasTrabajados = require('../models/diasTrabajados');

// =====================================
// OBTENER HORAS PROYECTO
// =====================================
app.get('/horas-proyecto/:id', mdAutenticacion.verificaToken, (req, resp) => {
    var id = req.params.id;

    HorasActvidades.find({ proyecto: id })
        .populate('actividad', 'nombre _id')
        .exec((err, horasActividades) => {
            if (err) {
                return resp.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar días de trabajo',
                    errors: err
                });
            }

            resp.status(201).json({
                ok: true,
                horasActividades: horasActividades,
                usuarioToken: req.usuario
            });
        });
});

// =====================================
// OBTENER HORAS PROYECTOS
// =====================================
app.get('/horas-proyectos/:id', mdAutenticacion.verificaToken, (req, resp) => {
    var id = req.params.id;

    HorasActvidades.find()
        .populate('actividad', 'nombre _id')
        .populate('proyecto', 'nombre _id codigo')
        .exec((err, horasActividades) => {
            if (err) {
                return resp.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar días de trabajo',
                    errors: err
                });
            }

            resp.status(201).json({
                ok: true,
                horasActividades: horasActividades,
                usuarioToken: req.usuario
            });
        });
});

// =====================================
// OBTENER HORA TRABAJO
// =====================================
app.get('/:id', mdAutenticacion.verificaToken, (req, resp) => {
    var id = req.params.id;

    HorasActvidades.findById(id)
        .populate('actividad', 'nombre _id')
        .populate('proyecto', 'nombre _id codigo')
        .exec((err, horasActividades) => {
            if (err) {
                return resp.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar días de trabajo',
                    errors: err
                });
            }

            resp.status(201).json({
                ok: true,
                horasActividades: horasActividades,
                usuarioToken: req.usuario
            });
        });
});

// =====================================
// ACTUALIZAR HORA ACTIVIDAD  
// =====================================
app.put('/:id', mdAutenticacion.verificaToken, (req, resp) => {
    var id = req.params.id;

    var body = req.body;

    HorasActvidades.findById(id, (err, horaActvidad) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al buscar la hora',
                errors: err
            });
        }

        if (!horaActvidad) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'La hora con el id ' + id + ' no existe',
                errors: { message: 'No existe la hora con ese ID' }
            });
        }

        horaActvidad.cantidad = body.cantidad;
        horaActvidad.desde = body.desde;
        horaActvidad.hasta = body.hasta;
        horaActvidad.proyecto = body.proyecto;
        horaActvidad.actividad = body.actividad;

        horaActvidad.save((err, horaActividadGuardado) => {
            if (err) {
                return resp.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar la hora',
                    errors: err
                });
            }

            resp.status(200).json({
                ok: true,
                horaActvidad: horaActividadGuardado
            });

        });

    });
});

// =====================================
// ELIMINAR HORA ACTIVIDAD
// =====================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    DiasTrabajados.findOne({ horasTrabajadas: id }).exec((err, diasTrabajados) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al buscar día de trabajo',
                errors: err
            });
        }

        var actividades = diasTrabajados.horasTrabajadas;
        if (actividades.length > 1) {
            var actividad = actividades.indexOf(id);
            actividades.splice(actividad, 1);

            diasTrabajados.save((err, diaTrabajadoGuardado) => {
                if (err) {
                    return resp.status(400).json({
                        ok: false,
                        mensaje: 'Error al actualizar día de trabajo',
                        errors: err
                    });
                }

                HorasActvidades.findByIdAndRemove(id, (err, horaActividadBorrada) => {
                    if (err) {
                        return resp.status(500).json({
                            ok: false,
                            mensaje: 'Error al borrar hora de trabajo',
                            errors: err
                        });
                    }

                    if (!horaActividadBorrada) {
                        return resp.status(400).json({
                            ok: false,
                            mensaje: 'La hora de trabajo con el id ' + id + ' no existe',
                            errors: { message: 'No existe la hora de trabajo con ese ID' }
                        });
                    }

                    return resp.status(200).json({
                        ok: true,
                        horaActvidad: horaActividadBorrada
                    });

                });

            });
        } else {
            DiasTrabajados.findByIdAndRemove(diasTrabajados._id, (err, diaTrabajadoBorrado) => {
                if (err) {
                    return resp.status(500).json({
                        ok: false,
                        mensaje: 'Error al borrar dia de trabajo',
                        errors: err
                    });
                }

                if (!diaTrabajadoBorrado) {
                    return resp.status(400).json({
                        ok: false,
                        mensaje: 'El dia de trabajo con el id ' + id + ' no existe',
                        errors: { message: 'No existe el dia de trabajo con ese ID' }
                    });
                }

                HorasActvidades.findByIdAndRemove(id, (err, horaActividadBorrada) => {
                    if (err) {
                        return resp.status(500).json({
                            ok: false,
                            mensaje: 'Error al borrar hora de trabajo',
                            errors: err
                        });
                    }

                    if (!horaActividadBorrada) {
                        return resp.status(400).json({
                            ok: false,
                            mensaje: 'La hora de trabajo con el id ' + id + ' no existe',
                            errors: { message: 'No existe la hora de trabajo con ese ID' }
                        });
                    }

                    return resp.status(200).json({
                        ok: true,
                        horaActvidad: horaActividadBorrada
                    });

                });

            });
        }
    });

});

module.exports = app;