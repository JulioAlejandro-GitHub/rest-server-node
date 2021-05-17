
const express = require('express');

//El intercambio de recursos de origen cruzado ( CORS )
var cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.rutasPath = {
            'auth':'/api/auth',
            'categorias':'/api/categorias',
            'usuarios':'/api/usuarios',
            'productos':'/api/productos'
        }

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
        this.app.use(this.rutasPath.auth,require('../routes/auth'));
        this.app.use(this.rutasPath.usuarios,require('../routes/usuarios'));
        this.app.use(this.rutasPath.categorias,require('../routes/categorias'));
        this.app.use(this.rutasPath.productos,require('../routes/productos'));
    };

    listen() {
        this.app.listen(this.port, () =>{
            console.log(`servidor en ${this.port}`);
        })
    }

}

module.exports = Server;