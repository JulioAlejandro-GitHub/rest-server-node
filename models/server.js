
const express = require('express');

//El intercambio de recursos de origen cruzado ( CORS )
var cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // conect DB
        this.conectarDB();


        // Middelwares
        this.middelswares();

        // ruras app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }
    
    middelswares() {
        this.app.use(cors());

        // lectura y parceo del body :: solicitud
        this.app.use( express.json() );

        // directorio publico
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.usuariosPath,require('../routes/usuarios'));
    };

    listen() {
        this.app.listen(this.port, () =>{
            console.log(`servidor en ${this.port}`);
        })
    }

}

module.exports = Server;