
const express = require('express');
var cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Middelwares
        this.middelswares();

        // ruras app
        this.routes();
    }
    middelswares() {
        this.app.use(cors());

        // lectura y parceo del body :: solicitud
        this.app.use( express.json() );

        // directorio publico
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.usuariosPath,require('../routes/usuarios'));
    };

    listen() {
        this.app.listen(this.port, () =>{
            console.log(`servidor en ${this.port}`);
        })
    }

}

module.exports = Server;