const { response } = require("express")


const validarArchivoSubir = (req, res=response, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded. 1');
    }
    if (!req.files.archivo) {
        return res.status(400).send('No files.archivo were uploaded. 2');
    }
    next();
}
module.exports = {
    validarArchivoSubir
}