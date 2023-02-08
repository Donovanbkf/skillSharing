const jwt = require('jsonwebtoken');


const checkAuth = (rol) => (req, res, next) => {
// const checkAuth = (req, res, next) => {
  // console.log(rol)
  if (!req.headers.authorization) {
    return res.send('no estas autorizado')
  }
  // console.log(req.headers.authorization);
  const token = req.headers.authorization.split(" ").pop();
  const decoded = jwt.verify(token, process.env.JWT_key);
  // console.log(decoded);
  if(rol == 'admin'){
    if (decoded.rol != 'admin'){
      return res.send('no tienes los derechos')
    }
  }
  req.user = decoded
  next();
};

module.exports = checkAuth;
