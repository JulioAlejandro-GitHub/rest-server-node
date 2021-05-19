
const validarJWT = require('../middlewares/validar-jwt');
const validarCampos = require('../middlewares/validar-campos');
const validaRoles = require('../middlewares/validar-roles');
const validarArchivoSubir = require('../middlewares/validarArchivo');

module.exports = {
    ...validarJWT,
    ...validarCampos,
    ...validaRoles,
    ...validarArchivoSubir
}