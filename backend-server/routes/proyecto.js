var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Proyecto = require('../models/proyecto');

// =====================================
// OBTENER TODOS LOS PROYECTOS
// =====================================
app.get('/', mdAutenticacion.verificaToken, (req, resp, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Proyecto.find({})
        .skip(desde)
        .limit(10)
        .populate('actividades', 'nombre _id')
        .exec(
            (err, proyectos) => {
                if (err) {
                    return resp.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando proyectos',
                        errors: err
                    });
                }

                Proyecto.count({}, (err, conteo) => {
                    resp.status(200).json({
                        ok: true,
                        proyectos: proyectos,
                        total: conteo
                    });
                });
            }
        );
});

// =====================================
// OBTENER TODOS LOS PROYECTOS - GRÁFICA
// =====================================
app.get('/todos-proyectos', mdAutenticacion.verificaToken, (req, resp, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Proyecto.find({})
        .exec(
            (err, proyectos) => {
                if (err) {
                    return resp.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando proyectos',
                        errors: err
                    });
                }

                Proyecto.count({}, (err, conteo) => {
                    resp.status(200).json({
                        ok: true,
                        proyectos: proyectos,
                        total: conteo
                    });
                });
            }
        );
});

// =====================================
// CREAR PROYECTO
// =====================================
app.post('/', mdAutenticacion.verificaToken, (req, resp) => {

    var body = req.body;

    var proyecto = new Proyecto({
        codigo: body.codigo,
        nombre: body.nombre,
        fechaInicio: body.fechaInicio,
        fechaTermino: body.fechaTermino,
        cantidadHoras: body.cantidadHoras
    });

    proyecto.save((err, proyectoGuardado) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Error al crear proyecto',
                errors: err
            });
        }

        resp.status(201).json({
            ok: true,
            proyecto: proyectoGuardado,
            usuarioToken: req.usuario
        });

    });

});

// =====================================
// OBTENER PROYECTO
// =====================================
app.get('/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    Proyecto.findById(id)
        .populate('actividades')
        .exec((err, proyecto) => {
            if (err) {
                return resp.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar proyecto',
                    errors: err
                });
            }

            if (!proyecto) {
                return resp.status(400).json({
                    ok: false,
                    mensaje: 'El proyecto con el id ' + id + ' no existe',
                    errors: { message: 'No existe el proyecto con ese ID' }
                });
            }

            return resp.status(200).json({
                ok: true,
                proyecto: proyecto
            });
        });
});

// =====================================
// ACTUALIZAR PROYECTO  
// =====================================
app.put('/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    var body = req.body;

    Proyecto.findById(id, (err, proyecto) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al buscar proyecto',
                errors: err
            });
        }

        if (!proyecto) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'El proyecto con el id ' + id + ' no existe',
                errors: { message: 'No existe el proyecto con ese ID' }
            });
        }

        proyecto.codigo = body.codigo;
        proyecto.nombre = body.nombre;
        proyecto.fechaInicio = body.fechaInicio,
            proyecto.fechaTermino = body.fechaTermino,
            proyecto.cantidadHoras = body.cantidadHoras

        proyecto.save((err, proyectoGuardado) => {
            if (err) {
                return resp.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar proyecto',
                    errors: err
                });
            }

            resp.status(200).json({
                ok: true,
                proyecto: proyectoGuardado
            });

        });

    });

});

// =====================================
// ELIMINAR PROYECTO
// =====================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    Proyecto.findByIdAndRemove(id, (err, proyectoBorrado) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al borrar proyecto',
                errors: err
            });
        }

        if (!proyectoBorrado) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'El proyecto con el id ' + id + ' no existe',
                errors: { message: 'No existe el proyecto con ese ID' }
            });
        }

        resp.status(200).json({
            ok: true,
            proyecto: proyectoBorrado
        });

    });

});

// =====================================
// ASIGNAR ACTIVIDADES PROYECTO
// =====================================
app.put('/asignar-actividades/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    var body = req.body;

    var actividad = body.actividad;

    Proyecto.findById(id, (err, proyecto) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al buscar proyecto',
                errors: err
            });
        }

        if (!proyecto) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'El proyecto con el id ' + id + ' no existe',
                errors: { message: 'No existe el proyecto con ese ID' }
            });
        }

        proyecto.actividades.push(actividad);

        proyecto.save((err, proyectoGuardado) => {
            if (err) {
                return resp.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar proyecto',
                    errors: err
                });
            }

            resp.status(200).json({
                ok: true,
                proyecto: proyectoGuardado
            });

        });

    });

});

// =====================================
// Eliminar ACTIVIDAD PROYECTO
// =====================================
app.put('/eliminar-actividad/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    var body = req.body;

    var actividad = body.actividad;

    Proyecto.findById(id, (err, proyecto) => {
        if (err) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al buscar proyecto',
                errors: err
            });
        }

        if (!proyecto) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'El proyecto con el id ' + id + ' no existe',
                errors: { message: 'No existe el proyecto con ese ID' }
            });
        }

        var index =  proyecto.actividades.indexOf(actividad);
        if (index > -1) {
            proyecto.actividades.splice(index, 1);
        }

        proyecto.save((err, proyectoGuardado) => {
            if (err) {
                return resp.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar proyecto',
                    errors: err
                });
            }

            resp.status(200).json({
                ok: true,
                proyecto: proyectoGuardado
            });

        });

    });

});
module.exports = app;