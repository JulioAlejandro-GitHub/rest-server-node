
//solo ayuda con tipado
const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req, res = response) => {
    const {correo, password} = req.body;
    try{
        //const usuario = await Usuario.findOne({correo, estado:true});
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {//usr existe
            return res.status(400).json({
                'msg':'user / passw - error email'
            });
        }
        if (!usuario.estado) {//usr acctivo
            return res.status(400).json({
                'msg':'user / passw - error estado'
            });
        }

        const validaPassw = bcryptjs.compareSync(password, usuario.password);
        if (!validaPassw) {//usr passw ok
            return res.status(400).json({
                'msg':'user / passw - error passw'
            });
        }

        // generar sesion JWT
        const token = await generarJWT(usuario._id);

        res.status(200).json({
            'msg':'login api  - controlador',
            usuario,
            token
        });
    }catch(error) {
        res.status(500).json({
            'msg':'error login api  - controlador *****'
        });
    }

}
module.exports = {
    login
}