const jwt = require('jsonwebtoken');

/**
 * Middleware que verifica si el usuario está autenticado y autorizado.
 * @param {string} rol - El rol requerido ("admin" o nada).
 * @param {object} req - El objeto de solicitud HTTP.
 * @param {object} res - El objeto de respuesta HTTP.
 * @param {function} next - Función para pasar el control al siguiente middleware/ruta.
 * @returns {void}
 */
const checkAuth = (rol) => (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('no estas autorizado')
  }
  const token = req.headers.authorization.split(" ").pop();
  try {
    const decoded = jwt.verify(token, process.env.JWT_key); // Verifica el token con la clave secreta
    if(rol == 'admin'){
      if (decoded.rol != 'admin'){
        return res.status(403).send('no tienes los derechos')
      }
    }
    req.user = decoded
    next();
  } catch (error) {
    return res.status(401).send({ mensaje: 'Autenticación fallida' }); // Si el token no es válido, devuelve un mensaje de error
  }
  
};

module.exports = checkAuth;
