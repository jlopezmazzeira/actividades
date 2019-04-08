var express = require('express');

var app = express();

var Actividad = require('../models/actividad');
var Proyecto = require('../models/proyecto');
var Usuario = require('../models/usuario');

// =====================================
// BUSQUEDA POR COLECCIÓN
// =====================================
app.get('/coleccion/:tabla/:busqueda', (req, resp, next) => {

    var tabla = req.params.tabla;
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');
    var promesa;

    switch (tabla) {
        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
            break;
        case 'proyectos':
            promesa = buscarProyectos(busqueda, regex);
            break;
        case 'actividades':
            promesa = buscarActividades(busqueda, regex);
            break;
        default:
            return resp.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo son: Proyectos, Actividades y Usuarios',
                error: { message: 'Tipo de tabla/coleccion no valida' }
            });
    }

    promesa.then(data => {
        resp.status(200).json({
            ok: true,
            [tabla]: data
        });
    });

});

// =====================================
// BUSQUEDA GENERAL
// =====================================
app.get('/todo/:busqueda', (req, resp, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
            buscarActividades(busqueda, regex),
            buscarProyectos(busqueda, regex),
            buscarUsuarios(busqueda, regex)
        ])
        .then(respuesta => {
            resp.status(200).json({
                ok: true,
                actividades: respuesta[0],
                proyectos: respuesta[1],
                usuarios: respuesta[2]
            });
        })

});

function buscarActividades(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Actividad.find({ nombre: regex })
            .exec((err, actividades) => {

                if (err) {
                    reject('Error al cargar actividades ', err);
                } else {
                    resolve(actividades);
                }

            });
    });
}

function buscarProyectos(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Proyecto.find({ nombre: regex })
            .populate('actividades')
            .exec((err, proyectos) => {

                if (err) {
                    reject('Error al cargar proyectos ', err);
                } else {
                    resolve(proyectos);
                }

            });
    });
}

function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {
        Usuario.find({}, 'nombre correo role img')
            .or([{ 'nombre': regex, 'correo': regex }])
            .exec((err, usuarios) => {
                if (err) {
                    reject('Error al cargar usuarios ', err);
                } else {
                    resolve(usuarios);
                }
            });
    });
}

module.exports = app;