const { response } = require("express");
const { Producto } = require('../models');


//obtener categorias :: id
const obtenerProductos = async(req = request, res = response) => {
    const {page=1, limit=5, desde=0} = req.query;
    const condicionDB = {estado:true};

    const {id} = req.params;//id del usuario actualizar
    if (id) {
        condicionDB._id = id;
    }

    const [total, productos] = await Promise.all([
        Producto.countDocuments(condicionDB),
        Producto.find(condicionDB)
            .populate('usuario','nombre')
            .populate('categoria','nombre')
            .skip(Number(desde))
            .limit(Number(limit))
    ]);
    res.status(200).json({
        total,
        productos
    });
}

//actualizar
const actualizarProducto = async(req, res = response) => {
    //limpiar para prevenir inyeccion de datos maliciosos 
    const {id} = req.query;//id del producto actualizar
    const nombre = req.body.nombre.toUpperCase();
    const {
        estado,
        precio,
        disponible,
        //nombre,
        categoria
    } = req.body;

    /**
     * validar la categoria
     */

    const dataActualizar ={
        estado,
        precio,
        disponible,
        //nombre,
        categoria,
        usuario:req.usuarioAutenticado._id
    };

    if (nombre) {
        dataActualizar.nombre = req.body.nombre.toUpperCase();
    }

    //findByIdAndUpdate busca actualiza y regresa // {new:true} retorna la data nueva
    const productos = await Producto.findByIdAndUpdate(id, dataActualizar, {new:true});
    
    res.status(202).json({
        productos
    });
}

//borrar
const borrarProducto = async(req, res=response) => {
    const {id} = req.query;//id del usuario actualizar

    const productos = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true});
    res.status(202).json({
        'msg':`delete productos api [${id}] - controlador`,
        productos
    });
}

const crearProducto = async(req, res=response) => {
    const nombre = req.body.nombre.toUpperCase();
    //const categoria = req.body.categoria;
    const {
        estado,
        precio,
        disponible,
        //nombre,
        categoria
    } = req.body;

    const productoDB = await Producto.findOne({nombre});

    if (productoDB) {
        return res.status(400).json({
            "msg":`productoDB existe ${nombre}`
        });
    }

    const data = {
        estado,
        precio,
        disponible,
        nombre,
        categoria,
        usuario:req.usuarioAutenticado._id
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json({
        producto
    })
}

module.exports = {
    crearProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto
}