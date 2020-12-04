const express = require('express');
const _ = require('underscore');
const app = express();
const Productos = require('../models/productos');

app.get('/productos', (req,res)=> {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Productos.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('categoria usuario', 'descripcion usuario nombre email')
    .exec((err, productos) =>{
        if (err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al encontrar los productos',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Productos listados con exito',
            conteo: productos.length,
            productos
        })
    })
});

app.post('/productos', (req,res)=>{
    let pro = new Productos({
        nombre: req.body.nombre,
        precioU: req.body.precioU,
        categoria: req.body.categoria,
        disponible: req.body.disponible,
        usuario: req.body.usuario
    });

    pro.save((err,proDB)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un producto',
                err
            })
        }
        res.json({
            ok: true,
            msg: 'Producto insertado con exito',
            proDB
        });
    });
});

app.put('/productos/:id', (req,res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioU', 'categoria', 'disponibilidad', 'usuario']);

    Productos.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'}, (err,proDB)=>{
        if (err){
            return res.status(400).json({
                ok: true,
                msg: 'Ocurrio un error al momento de actualizar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Producto actualizado con exito',
            proDB
        });
    });
});

app.delete('/productos/:id', (req,res) => {
    let id = req.params.id;

    Productos.findByIdAndUpdate(id, { disponible: false, runValidators: true, context: 'query'}, (err,proDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }
        
        res.json({
            ok: true,
            msg: 'Producto eliminado con exito',
            proDB
        });
    });
});

module.exports = app;