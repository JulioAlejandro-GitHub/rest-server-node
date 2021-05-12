
const {response, request} = require('express');

const usuariosGet = (req = request, res = response) => {
    const {f='none', page=1, limit=10} = req.query;
    res.json({
        'msg':'get api  - controlador',
        f,
        page,
        limit
    })
}
const usuariosPost = (req, res = response) => {
    //limpiar para prevenir inyeccion de datos maliciosos 
    const {nombre, edad} = req.body;
    res.status(201).json({
        'msg':'post api  - controlador',
        nombre,
        edad
    })
}
const usuariosPut = (req, res = response) => {
    //limpiar para prevenir inyeccion de datos maliciosos 
    const {id} = req.params;
    res.json({
        'msg':'put api  - controlador',
        id
    })
}
const usuariosDelete = (req, res) => {
    res.json({
        'msg':'delete api  - controlador'
    })
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}