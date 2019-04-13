var express = require('express');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');

var SERVICE = require('../config/config').SERVICE;
var USER = require('../config/config').USER;
var PASSWORD = require('../config/config').PASSWORD;
var SEED = require('../config/config').SEED;

var app = express();

var Usuario = require('../models/usuario');
var Token = require('../models/token');

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
                errors: { message: 'No existe el usuario con el correo: ' + body.correo }
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

        var token = generarToken();
        var url = 'http://localhost:4200/#/recover-password/' + usuarioDB._id + '/' + token;

        var bodyEmail = '<p>Estimado/a: ' + usuarioDB.nombre + '</p><hr>';
        bodyEmail += '<p>Recientemente haz solicitado el restablecimiento de tu contraseña ';
        bodyEmail += 'de tu ID. Para completar el proceso, haz clic en el siguiente enlace: </p><br/>';
        bodyEmail += '<a href="' + url + '">Restablecer ahora</a><br/>';
        bodyEmail += '<hr>';
        bodyEmail += '<p>Si no haz sido tu, haz caso omiso a este email. </p>';
        bodyEmail += '<p>Atentamente,</p><br/>';
        bodyEmail += '<p>Soporte técnico</p><br/>';

        // Definimos el email
        var mailOptions = {
            from: 'Jesus Lopez',
            to: body.correo,
            subject: 'Como restablecer tu contraseña',
            html: bodyEmail
        };

        // Enviamos el email
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return resp.status(500).json({
                    ok: false,
                    mensaje: 'Error al enviar el correo',
                    errors: err
                });
            } else {
                var fecha = new Date();
                fecha.setDate(fecha.getDate() + 1);

                var nuevoToken = new Token({
                    usuario: usuarioDB._id,
                    token: token,
                    vence: fecha
                });

                nuevoToken.save((err, tokenGuardado) => {
                    if (err) {
                        return resp.status(400).json({
                            ok: false,
                            mensaje: 'Error al crear token',
                            errors: err
                        });
                    }

                    resp.status(201).json({
                        ok: true,
                        mensaje: 'Correo enviado exitosamente'
                    });

                });
            }
        });

    });

});

function generarToken() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = app;