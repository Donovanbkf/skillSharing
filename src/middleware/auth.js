const jwt = require('jsonwebtoken');


const checkAuth = (req, res, next) => {

  if (!req.headers.authorization) {
      res.send('mal')
    return;
  }
  console.log(req.headers.authorization);
  const token = req.headers.authorization.split(" ").pop();
  const decoded = jwt.verify(token, process.env.JWT_key);
  console.log(decoded);
  req.user = decoded
  next();
};

module.exports = checkAuth;
