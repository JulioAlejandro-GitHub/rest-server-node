
const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    correo:{
        type: String,
        required: [true, 'Correo obligatorio'],
        unique:true,
        trim: true,
        index: true
    },
    nombre:{
        type: String,
        required: [true, 'Nomnre obligatorio'],
        trim: true
    },
    password:{
        type: String,
        required: [true, 'Contraseña obligatorio']
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum:['ADMIN_ROLE','USER_ROLE','VENTA_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

/*
debe ser una funcion normal
*** si es de flecha, se mantiene (traspasan los valores glovalmente)
en este caso queremos que sea solo de esta instancia
* cuando se llama el toJSON pasa por aqui

remueve campos que no queremos retornar
/Users/julio/Desktop/udemy/07-restserver/controllers/usuarios.js
usuariosPost
    res.status(201).json({
        'msg':'post api  - controlador',
        usuario
    })
*/
UsuarioSchema.methods.toJSON = function() {
    const {__v, password, google, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}
/*
crea coleccion (tabla) Usuario con el Schema
*/
module.exports = model('Usuario',UsuarioSchema);
