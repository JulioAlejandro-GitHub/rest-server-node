
const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    usuario:{ //relacion tabla ref Usuario
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    },
    categoria:{ //relacion tabla ref Categoria
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        required: true
    },
    nombre:{
        type: String,
        required: [true, 'Nombre obligatorio'],
        unique:true,
        trim: true,
        index: true
    },
    img:{
        type:String
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    precio:{
        type: Number,
        default: 0
    },
    descripcion:{
        type: String
    },
    disponible:{
        type: Boolean,
        default: true
    }
}, {timestamps: true});

ProductoSchema.methods.toJSON = function() {
    const {__v, estado, ...data} = this.toObject();
    //usuario.uid = _id;
    return data;
}

module.exports = model('Producto', ProductoSchema);