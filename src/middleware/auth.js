const jwt = require('jsonwebtoken');


const checkAuth = (rol) => (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('no estas autorizado')
  }
  const token = req.headers.authorization.split(" ").pop();
  const decoded = jwt.verify(token, process.env.JWT_key);
  if(rol == 'admin'){
    if (decoded.rol != 'admin'){
      return res.status(403).send('no tienes los derechos')
    }
  }
  req.user = decoded
  next();
};

module.exports = checkAuth;
