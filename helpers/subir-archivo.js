
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['png','jpg','jpeg','gif'], dir='') => {
    return new Promise( (resolve, reject) => {
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length -1];
    
        //validar extension
        //const extensionesValidas = ['png','jpg','jpeg','gif'];
        if (!extensionesValidas.includes(extension)) {
            return reject(`extensiones validas ${extensionesValidas}`);
        }
    
        const nombreTemp = uuidv4() + '.' + extension; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
        const uploadPath = path.join(__dirname, '/../uploads/', dir, nombreTemp);
      
        archivo.mv(uploadPath, function(err) {
            if (err) {
                return reject(err);
            }
            
            resolve(nombreTemp);
        });
    });
}

module.exports = {
    subirArchivo
}