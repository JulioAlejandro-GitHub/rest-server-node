
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol='') => {
    if (!Usuario.schema.obj.rol.enum.includes(rol)) {
        throw new Error(`El rol ${rol} no existe en rol.enum :: rol.enum`)
    }

    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe en DB :: esRoleValido`)
    }
}
const existeEmail = async(correo='') => {
    // verificar correo
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`ADD usuario existeEmail en DB :: ${correo}`)
    }
}
const existeUsuarioById = async(id='') => {
    // verificar correo
    const existeUsuario = await Usuario.findById({_id:id});
    if (!existeUsuario) {
        throw new Error(`id no existe en BD  ***** :: ${id}  :: `)
    }
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioById
}