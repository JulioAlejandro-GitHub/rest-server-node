const { response } = require("express");
const { Categoria } = require('../models')

//obtener categorias :: id
const obtenerCategorias = async(req = request, res = response) => {
    const {page=1, limit=5, desde=0} = req.query;
    const condicionDB = {estado:true};

    const {id} = req.params;//id del usuario actualizar
    if (id) {
        condicionDB._id = id;
    }

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(condicionDB),
        Categoria.find(condicionDB)
            .populate('usuario','nombre')
            .skip(Number(desde))
            .limit(Number(limit))
    ]);
    res.status(200).json({
        total,
        categorias
    });
}

//actualizar
const actualizarCategoria = async(req, res = response) => {
    //limpiar para prevenir inyeccion de datos maliciosos 
    const {id} = req.query;//id del usuario actualizar

    const  {
        nombre,
        estado
    } = req.body;

    if (!nombre) {
        return res.status(400).json({
            "msg":`nombre invalido ***** ${nombre}`
        });
    }

    const dataActualizar ={
        nombre,
        estado,
        usuario:req.usuarioAutenticado._id
    };
    //findByIdAndUpdate busca actualiza y regresa // {new:true} retorna la data nueva
    const categoria = await Categoria.findByIdAndUpdate(id, dataActualizar, {new:true});
    
    res.status(202).json({
        categoria
    });
}

//borrar
const borarCategoria = async(req, res=response) => {
    const {id} = req.query;//id del usuario actualizar

    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false});
    res.status(202).json({
        'msg':`delete categoria api [${id}] - controlador`,
        categoria
    });
}

const crearCategoria = async(req, res=response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});
    if (categoriaDB) {
        return res.status(400).json({
            "msg":`categoria existe ${nombre}`
        });
    }

    const data = {
        nombre,
        usuario:req.usuarioAutenticado._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json({
        categoria
    })
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    actualizarCategoria,
    borarCategoria
}