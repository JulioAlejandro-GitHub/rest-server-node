
const {Router} = require('express');
const { check } = require('express-validator');

/*
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const {esAdminRole, tieneRol} = require('../middlewares/validar-roles');
*/
const {
    validarJWT, 
    validarCampos, 
    esAdminRole, 
    tieneRol
} = require('../middlewares');

//const Usuario = require('../models/usuario');
const {
    esRoleValido, 
    existeEmail,
    existeUsuarioById
} = require('../helpers/db-validators');

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
} = require('../controllers/usuarios');

const router = Router();
/*
const { check } = require('express-validator');
es un midellware valida datos 
crea y agrega los errores al request,
para luego validar si existen estos 
hard validator
*/

// listar usuarios paginados
router.get('/', usuariosGet );

//crear usuario
router.post('/', [
    check('nombre','nombre invalido').not().isEmpty(),
    check('correo','Correo invalido').isEmail(),
    check('password','password invalido, min 5').isLength({min:5}),
    
    check('correo').custom(existeEmail),

    //check('rol').custom( (rol) => esRoleValido(rol) ),
    // es lo mismo, por referencia "rol" para como parametro, tienen el mismo nombre
    check('rol').custom( esRoleValido ),
    //check('rol','Schema rol invalido').isIn(Usuario.schema.obj.rol.enum),

    validarCampos, /* custom validations errores al request */ 
    
], usuariosPost );

// actualizar
router.put('/:id', [
    check('id','id inválido').isMongoId(),
    check('id').custom( existeUsuarioById ),
    check('rol').custom( esRoleValido ),
    validarCampos /* custom validations errores al request */ 
], usuariosPut );

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    tieneRol('ADMIN_ROLE','VENTA_ROLE'),
    check('id','id inválido').isMongoId(),
    check('id').custom( existeUsuarioById ),
    validarCampos
], usuariosDelete );

module.exports = router;