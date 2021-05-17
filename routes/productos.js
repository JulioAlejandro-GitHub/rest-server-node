const {Router} = require('express');
const { check } = require('express-validator');

const { validarJWT, esAdminRole} = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const {
    crearProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto
}=require('../controllers/productos');
const {
    existeCategoriaById,
    existeProductoById
} = require('../helpers/db-validators');

const router = Router();

/**listar producto - publico */
router.get('/', obtenerProductos);

// buscar producto por id - publico 
router.get('/:id', [
    check('id','id inválido isMongoId').isMongoId(),
    check('id').custom( existeProductoById ),
    validarCampos
], obtenerProductos);

//crear producto - privado 
router.post('/', [
    validarJWT,
    check('nombre','nombre obligatorio').not().isEmpty(),
    check('categoria','categoria obligatorio').isMongoId(),
    check('categoria').custom( existeCategoriaById ),
    validarCampos
], crearProducto);

// actualizar producto - privado 
router.put('/', [
    validarJWT,
    check('id','id inválido').isMongoId(),
    check('id').custom( existeProductoById ),

   // check('categoria').custom( validaIdCategoriaProducto ),

    validarCampos /* custom validations errores al request */ 
], actualizarProducto);

//marcar eliminado producto
router.delete('/', [
    validarJWT,
    esAdminRole,
    check('id','id inválido').isMongoId(),
    check('id').custom( existeProductoById ),
    validarCampos /* custom validations errores al request */ 
], borrarProducto);

module.exports = router;