const { validationResult } = require('express-validator');

/*
al ser un middlelware, 
si da un error, ya retorna y no continua.
caso que validacion es correcta, debe continuar con next();
que da paso al sigiente validacion o ejecura la ruta controlador
*/
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            "msg":errors
        })
    }
    next();
}
module.exports = {
    validarCampos
}
