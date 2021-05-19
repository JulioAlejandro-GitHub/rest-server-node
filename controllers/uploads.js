
const path = require('path');
const fs =require('fs');
const { response } = require("express");

const  cloudinary  =  require ( 'cloudinary' ) . v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");


const typeFileValid_text = {
    ext:['pdf','txt'],
    dir:'documents'
};
const typeFileValid_img = {
    ext:['png','jpg','jpeg','gif'],
    dir:'img'
};
const actualizarCloudinary = async(req, res = response) => {
    const {id, coleccion} = req.params;

    let modelo;

    switch(coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {//usuario no encontrado
                return res.status(500).send({
                    'msg':`Usuario no encontrado ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {//usuario no encontrado
                return res.status(500).send({
                    'msg':`Producto no encontrado ${id}`
                });
            }
            break;
        default:
            return res.status(500).send({
                'msg':'coleccion sin implementar'
            });
    }

    // eliminar img previa
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length -1];
        const [public_id] =nombre.split('.');
        // await se puede esperar respuesta 
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    
    modelo.img = secure_url;
    await modelo.save();

    return res.status(200).send(modelo);
}
const cargarArchivo = async(req, res = response) => {
    try {
        const pathCompleto = await subirArchivo(req.files, typeFileValid_img.ext, typeFileValid_img.dir);
        return res.status(200).send({
            path : pathCompleto
        });
    }catch(msg) {
        return res.status(400).send({
            msg
        });
    }
}
const actualizarImagen = async(req, res = response) => {
    const {id, coleccion} = req.params;

    let modelo;

    switch(coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {//usuario no encontrado
                return res.status(500).send({
                    'msg':`Usuario no encontrado ${id}`
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {//usuario no encontrado
                return res.status(500).send({
                    'msg':`Producto no encontrado ${id}`
                });
            }
            break;
        default:
            return res.status(500).send({
                'msg':'coleccion sin implementar'
            });
    }

    // eliminar img previa
    try {
        if (modelo.img) {
            const pathImg = path.join(__dirname , '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImg)) {
                fs.unlinkSync(pathImg);
            }
        }
    }catch(err) {
        console.log(err);
    }

    const newImg = await subirArchivo(req.files, typeFileValid_img.ext, coleccion);
    modelo.img = newImg;
    await modelo.save();

    return res.status(200).send(modelo);
}
const buscarUrlImagen = async(req, res = response) => {
    const {id, coleccion} = req.params;

    let modelo;

    switch(coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {//usuario no encontrado
                // img por defecto
                const pathImg = path.join(__dirname , '../public', 'img_producto_placeholder.png');
                return res.sendFile(pathImg);
                /*
                return res.status(500).send({
                    'msg':`img por defecto usr no encontrado ${id}`
                });
                */
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {//usuario no encontrado
                // img por defecto
                return res.status(500).send({
                    'msg':`img por defecto Producto no encontrado ${id}`
                });
            }
            break;
        default:
            return res.status(500).send({
                'msg':'coleccion sin implementar'
            });
    }

    if (modelo.img) {
        const pathImg = path.join(__dirname , '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg)
        }
    }
    
    const pathImg = path.join(__dirname , '../assets', 'img_producto_placeholder.png');
    return res.sendFile(pathImg);
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    buscarUrlImagen,
    actualizarCloudinary
}