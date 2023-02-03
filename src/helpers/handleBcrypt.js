const bcrypt = require("bcryptjs");

const encrypt = async (contraseña) => {
    return await bcrypt.hash(contraseña, 10)
}

const compare = async (contrasena , hash) => {
    return await bcrypt.compare(contrasena, hash)
}

module.exports = {encrypt, compare}
