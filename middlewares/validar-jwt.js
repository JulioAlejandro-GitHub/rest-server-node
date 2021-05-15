const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require('../models/usuario');


const validarJWT = async(req=request, res=response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            "msg":"sin token"
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);
        if (!uid) {
            return res.status(401).json({
                "msg":`uid invalido :: ${uid}`
            });
        }
        const existeUsuario = await Usuario.findById({_id:uid});
        if (!existeUsuario) {
            return res.status(401).json({
                "msg":`no existe uid en BD :: ${uid}`
            });
        }
        if (!existeUsuario.estado) {
            return res.status(401).json({
                "msg":`usuario inactivo`
            });
        }
        /*
        if (existeUsuario.rol !== 'ADMIN_ROLE') {
            return res.status(401).json({
                "msg":`solo admin puede eliminar`
            });
        }
        */

        //agrego uid al request
        req.usuarioAutenticado = existeUsuario;
        next();
    }catch(error) {
        console.log(error);
        return res.status(401).json({
            "msg":"token invalido"
        });
    }
    
}
module.exports = {
    validarJWT
}