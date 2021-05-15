const { response } = require("express");

const esAdminRole = (req, res=response, next) => {
    if (!req.usuarioAutenticado) {
        return res.status(500).json({
            "msg":"usr sin autenticar :: falta validar token"
        })
    }
    const {rol, nombre} = req.usuarioAutenticado;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            "msg":`${nombre}, no es adminstrador`
        });
    }
    next();
}
const tieneRol = ( ...roles ) => {
    return (req, res=response, next) => {
        if (!req.usuarioAutenticado) {
            return res.status(500).json({
                "msg":"usr sin autenticar :: falta validar token"
            })
        }
        if (!roles.includes(req.usuarioAutenticado.rol) ) {
            return res.status(401).json({
                "msg":`servivio requiere rol :: ${roles}`
            })
        }
        next();
    }
}
module.exports = {
    esAdminRole,
    tieneRol
}