const express = require('express');
const app = express();

app.get('/usuario', function (req, res){
    res.json({
        ok: 200,
        mensaje: 'usuarios consultados con exito'
    });
});

app.post('/usuario', function(req, res){
    let nombre = req.body.nombre;
    let body = req.body;

if(nombre == undefined){
    res.status(400).json({
        ok: 400,
        mensaje: 'favor de enviar el valor del nombre'
    });
}else{

    req.json({
        ok: 200,
        mensaje: 'usuario insertado con exito',
        nombre: nombre
    });
    }
});

app.put('/usuario:id:nombre', function(req, res){
    let id = req.params.id;
    let nombre = red.params.nombre;
    req.json({
        ok: 200,
        mensaje: 'usuario actualizado con exito',
        id: id,
        nombre: nombre
    });
});

app.delete('/usuario:id', function(req, res){
    let id = req.params.id;

    res.json({
        ok: 200,
        mensaje: 'usuario eliminado con exito',
        id: id
    });
});

module.exports = app;