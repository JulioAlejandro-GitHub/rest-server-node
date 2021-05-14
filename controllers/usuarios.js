
const {response, request} = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

//reporte usuarios paginado
const usuariosGet = async(req = request, res = response) => {

    const {page=1, limit=5, desde=0} = req.query;
    const condicionDB = {estado:true};

    /*
    //en este caso las promesas se ejecutan secuencialmente
    const usuarios = await Usuario.find(condicionDB)
        .skip(Number(desde))
        .limit(Number(limit));

    //total de registros en coleccion
    const totalResgistros = await Usuario.countDocuments(condicionDB);
    */

    // todas las promesas simultaneas
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(condicionDB),
        Usuario.find(condicionDB)
            .skip(Number(desde))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
}

// crear usuario
const usuariosPost = async(req, res = response) => {
    //limpiar para prevenir inyeccion de datos maliciosos 
    const {
        nombre,
        correo,
        password,
        rol
    } = req.body;

    // instancia de coleccion tabla
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });
    
    //encriptar pass (genSaltSync mayor numero mayor seguriddad defecto 10
    const salt = bcryptjs.genSaltSync();

    //actualiza propiedad
    usuario.password = bcryptjs.hashSync(password, salt);

    //graba el objeto en coleccion
    await usuario.save();

    res.status(201).json(usuario)
}

//actualizar usuario
const usuariosPut = async(req, res = response) => {
    //limpiar para prevenir inyeccion de datos maliciosos 
    const {id} = req.params;//id del usuario actualizar
    //const {_id, password, google, correo, ...resto} = req.body;
    const  {
        nombre,
        password,
        img,
        rol,
        estado
    } = req.body;

    const dataActualizar ={
        nombre,
        password,
        img,
        rol,
        estado
    };

    if (password) {
        //encriptar pass (genSaltSync mayor numero mayor seguriddad defecto 10
        const salt = bcryptjs.genSaltSync();

        //actualiza propiedad
        dataActualizar.password = bcryptjs.hashSync(password, salt);
    }

    /*
    id: debe existir, sino se cae SW
    resto: obj con  los mismos nombres y datos que schema usuario, sino, se cae
    useFindAndModify:false, debe estar establesido para usar findByIdAndUpdate
    */
    //findByIdAndUpdate busca actualiza y regresa
    const usuario = await Usuario.findByIdAndUpdate(id, dataActualizar);

    res.status(202).json(usuario);
}
const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;//id del usuario actualizar
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    res.status(202).json({
        'msg':'delete api  - controlador',
        id
    });
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}