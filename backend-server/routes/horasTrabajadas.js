var express = require('express');
var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var HorasActvidades = require('../models/horasTrabajadas');
var DiasTrabajados = require('../models/diasTrabajados');
var Usuario = require('../models/usuario');

// =====================================
// OBTENER HORAS USUARIOS (OBTENER TODOS LOS USUARIOS CON LAS HORAS TRABAJADAS) 
// =====================================
app.get('/', mdAutenticacion.verificaToken, (req, resp) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    DiasTrabajados.find({})
        .skip(desde)
        .limit(5)
        .populate({ path: 'horasTrabajadas', populate: [{ path: 'proyecto', select: 'codigo nombre _id' }, { path: 'actividad' }] })
        .populate('usuario', 'nombre login _id')
        .exec(
            (err, diasTrabajados) => {
                if (err) {
                    return resp.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando horas de trabajo',
                        errors: err
                    });
                }

                DiasTrabajados.count({}, (err, conteo) => {
                    resp.status(200).json({
                        ok: true,
                        diasTrabajados: diasTrabajados,
                        total: conteo
                    });
                });
            }
        );
});

// =====================================
// OBTENER DIAS TRABAJO USUARIO
// =====================================
app.get('/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    var id = req.params.id;
    Usuario.findById(id)
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

            DiasTrabajados.find({ usuario: id })
                .skip(desde)
                .limit(5)
                .populate({ path: 'horasTrabajadas', populate: [{ path: 'proyecto', select: 'codigo nombre _id' }, { path: 'actividad' }] })
                .populate('usuario', 'nombre login _id')
                .exec((err, diasTrabajados) => {
                    if (err) {
                        return resp.status(500).json({
                            ok: false,
                            mensaje: 'Error al buscar días de trabajo',
                            errors: err
                        });
                    }

                    resp.status(201).json({
                        ok: true,
                        diasTrabajados: diasTrabajados,
                        usuarioToken: req.usuario
                    });
                });

        });

});

// =====================================
// CREAR DÍA TRABAJADO 
// =====================================
app.post('/:id', mdAutenticacion.verificaToken, (req, resp) => {
    var id = req.params.id;
    var body = req.body;

    var horasTrabajadas = body.horasTrabajadas;
    horasTrabajadas = JSON.parse(horasTrabajadas);

    if (horasTrabajadas.length == 0) {
        return resp.status(400).json({
            ok: false,
            mensaje: 'Debes agregas una activdad',
            errors: { message: 'No hay actividades' }
        });
    }

    Usuario.findById(id)
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

            var diaTrabajado = new DiasTrabajados({
                dia: body.dia,
                usuario: usuario._id
            });

            diaTrabajado.horasTrabajadas = [];

            for (var indice in horasTrabajadas) {
                var horaTrabajada = horasTrabajadas[indice];

                var id = guardarHoraTrabajo(horaTrabajada);
                diaTrabajado.horasTrabajadas.push(id);
            }

            diaTrabajado.save((err, diaTrabajadoGuardado) => {
                if (err) {
                    return resp.status(400).json({
                        ok: false,
                        mensaje: 'Error al crear día de trabajo',
                        errors: err
                    });
                }

                resp.status(201).json({
                    ok: true,
                    diaTrabajadoGuardado: diaTrabajadoGuardado,
                    usuarioToken: req.usuario
                });

            });

        });
});

// =====================================
// ELIMINAR DIA TRABAJO  
// =====================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, resp) => {

    var id = req.params.id;

    DiasTrabajados.findByIdAndRemove(id, (err, diaTrabajadoBorrado) => {
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

        resp.status(200).json({
            ok: true,
            diaTrabajado: diaTrabajadoBorrado
        });

    });

});

// =====================================
// CREAR HORA ACTIVIDAD 
// =====================================
function guardarHoraTrabajo(horaTrabajada) {
    var newHoraTrabajada = new HorasActvidades({
        id: '',
        cantidad: horaTrabajada.cantidad,
        desde: horaTrabajada.desde,
        hasta: horaTrabajada.hasta,
        proyecto: horaTrabajada.proyecto,
        actividad: horaTrabajada.actividad
    });

    newHoraTrabajada.save((err, horaTrabajadaGuardada) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Error al crear hora de trabajo',
                errors: err
            });
        }
        newHoraTrabajada.id = horaTrabajadaGuardada._id;
    });

    return newHoraTrabajada.id;
}

module.exports = app;