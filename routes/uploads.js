const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoSubir } = require('../middlewares');
const {coleccionesPermitidas} = require('../helpers');
const {
    cargarArchivo, 
    actualizarImagen,
    buscarUrlImagen,
    actualizarCloudinary
} = require('../controllers/uploads');

const router = Router();

router.post('/', [
    validarArchivoSubir,
    validarCampos
], cargarArchivo );

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id','id no es mongoID').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c)),
    validarCampos
], actualizarCloudinary);

router.get('/:coleccion/:id', [
    check('id','id no es mongoID').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c)),
    validarCampos
], buscarUrlImagen);

module.exports = router;