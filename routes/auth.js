const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo','no email').isEmail(),
    check('password','ingrese passw').not().isEmpty(),
    validarCampos
], login );

router.post('/google',[
    check('id_token','passw obligatoria').not().isEmpty(),
    validarCampos
], googleSingIn );

module.exports = router;