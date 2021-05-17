

const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'Nombre obligatorio'],
        unique:true
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{ //relacion tabla ref Usuario
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    precio:{
        type: Number,
        default: 0
    },

    
    categoria:{ //relacion tabla ref Categoria
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        required: true
    },
    
    descripcion:{
        type: String
    },
    disponible:{
        type: Boolean,
        default: true
    }
});

ProductoSchema.methods.toJSON = function() {
    const {__v, estado, ...data} = this.toObject();
    //usuario.uid = _id;
    return data;
}

module.exports = model('Producto', ProductoSchema);