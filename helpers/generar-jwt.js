
const jwt = require('jsonwebtoken');

const generarJWT = (uid='') => {
    return new Promise( (resolve, reject) => {
        const payload = {uid};
        jwt.sign(
            payload,
            process.env.SECRET_PRIVATE_KEY,
            {
                expiresIn:'4h'
            }, 
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('no se genero el token');
                }else{
                    resolve(token);
                }
            }
        )
    })
    /*
    new Promise((resolver, rechazar) => {
        const payload = {uid};
        
        const token = jwt.sign(
            payload, 
            process.env.SECRET_PRIVATE_KEY, { 
            expiresIn: '1h' 
        });
        
        resolver(token);
    })
    .then(() => {
        throw new Error('Algo falló');
    })
    .catch(() => {
        console.log('Haz aquello');
        return 'fdfdfdf';
    })
    .then(() => {
        console.log('Haz esto sin que importe lo que sucedió antes');
        return '******';
    });
    */
}
module.exports = {
    generarJWT
}