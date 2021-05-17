const {Router} = require('express');
const { check } = require('express-validator');

const { validarJWT, esAdminRole} = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const {
    crearCategoria,
    obtenerCategorias,
    actualizarCategoria, 
    borarCategoria 
}=require('../controllers/categorias');
const {
    existeCategoriaById
} = require('../helpers/db-validators');

const router = Router();

/**listar categorias - publico */
router.get('/', obtenerCategorias);

// buscar categoria por id - publico 
router.get('/:id', [
    check('id','id inválido isMongoId').isMongoId(),
    check('id').custom( existeCategoriaById ),
    validarCampos
], obtenerCategorias);

//crear categoria - privado 
router.post('/', [
    validarJWT,
    check('nombre','nombre obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// actualizar categoria - privado 
router.put('/', [
    validarJWT,
    check('id','id inválido').isMongoId(),
    check('id').custom( existeCategoriaById ),
 //   check('rol').custom( esRoleValido ),
    validarCampos /* custom validations errores al request */ 
], actualizarCategoria);

//marcar eliminado categoria
router.delete('/', [
    validarJWT,
    esAdminRole,
    check('id','id inválido').isMongoId(),
    check('id').custom( existeCategoriaById ),
    validarCampos /* custom validations errores al request */ 
], borarCategoria);

module.exports = router;