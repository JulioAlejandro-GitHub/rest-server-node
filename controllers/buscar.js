

const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const {Usuario, Categoria, Producto} = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino='', res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        //buscar por usuario
        const usuario = await Usuario.findById(termino);
        return res.json({
            results : (usuario) ? [usuario] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $and: [
            {estado:true}
        ],
        $or:[
            {nombre:regex},
            {correo:regex}
        ]
    })
    .sort({'nombre': 1});

    res.json({
        results : usuarios
    });
}

const buscarProductos = async(termino='', res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        //buscar por usuario
        const producto = await Producto.findById(termino);
        return res.json({
            results : (producto) ? [producto] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    const productos = await Producto.find({
        $and: [
            {estado:true}
        ],
        $or:[
            {nombre:regex},
            //{categoria:ObjectId('60a278b77a41e66cec6b28e8')}
        ]
    })
    .sort({'nombre': 1});

    res.json({
        results : productos
    });
}

const buscar = async(req = request, res = response) => {
    const {coleccion, termino} = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            "msg":`colecciones permitidas ${coleccionesPermitidas}`
        });
    }
    switch(coleccion) {
        case 'usuarios':
            return buscarUsuarios(termino, res);
            break;
        case 'categorias':
            break;  
        case 'productos':
            return buscarProductos(termino, res);
            break;
        default:
            return res.status(500).json({
                'msg':`busqueda no especificada`
            });
    }
    res.status(200).json({
        coleccion, termino
    });
}

module.exports = {
    buscar
}