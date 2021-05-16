
//solo ayuda con tipado
const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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
const googleSingIn = async(req, res = response) => {

    const {id_token} = req.body;

    try {

        const googleUser = await googleVerify(id_token);

        /*
        autenticar o crear?
        */
       let usuario = await Usuario.findOne({correo:googleUser.correo});
       if (!usuario) {//crear
            const data = {
                correo:googleUser.correo,
                nombre:googleUser.nombre,
                img:googleUser.img,
                password:'googleSingIn',
                google:true
            };
            // instancia de coleccion tabla
            usuario = new Usuario(data);
            //graba el objeto en coleccion
            await usuario.save();
       }

       if (!usuario.estado) {//verifica estado en DB
            res.status(401).json({
                'msg':'usuario bloqueado'
            }); 
       }
        // generar sesion JWT
        const token = await generarJWT(usuario._id);
        res.status(200).json({
            'msg':'ok google SingIn',
            token
        }); 
    } catch(error) {
        res.status(400).json({
            'msg':'error token google SingIn'
        }); 
    }
    

}

module.exports = {
    login,
    googleSingIn
}