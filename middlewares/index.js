



const validarJWT = require('../middlewares/validar-jwt');
const validarCampos = require('../middlewares/validar-campos');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validarJWT,
    ...validarCampos,
    ...validaRoles
}