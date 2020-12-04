const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productosSchema = new Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es necesario'],
        unique: true
    },
    precioU: {
        type: Number,
        require: [true, 'El precio es necesario']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    disponible: {
        type: Boolean,
        default: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Productos', productosSchema)