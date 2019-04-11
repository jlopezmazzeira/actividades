var express = require('express');
var nodemailer = require('nodemailer');

var SERVICE = require('../config/config').SERVICE;
var USER = require('../config/config').USER;
var PASSWORD = require('../config/config').PASSWORD;

var app = express();

var Usuario = require('../models/usuario');

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
                mensaje: 'Correo inválido',
                errors: { message: 'No existe el usuario con el correo: ' +body.correo }
            });
        }

        // Definimos el transporter
        var transporter = nodemailer.createTransport({
            service: SERVICE,
            auth: {
                user: USER,
                pass: PASSWORD
            }
        });

        // Definimos el email
        var mailOptions = {
            from: 'Jesus Lopez',
            to: body.correo,
            subject: 'Recuperar contraseña',
            text: 'Contenido del email'
        };

        // Enviamos el email
        transporter.sendMail(mailOptions, function(error, info){
            if (error){
                return resp.status(500).json({
                    ok: false,
                    mensaje: 'Error al enviar el correo',
                    errors: err
                });
            } else {
                resp.status(200).json({
                    ok: true,
                    mensaje: 'Correo enviado exitosamente'
                });
            }
        });

    });
    
});

module.exports = app;