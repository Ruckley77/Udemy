const jwt = require('../utils/jwt');

async function asureAuth(req, res, next) {
  try {
    const headerauth = req.headers.authorization;
    if (!headerauth) {
      return res.status(403).send('No header auth');
    }

    const token = headerauth.replace('Bearer', '');
    const payload = jwt.verifyToken(token);
    const { exp } = payload;
    const currentTime = new Date().getTime();

    if (exp <= currentTime) {
      return res.status(400).send('Token Expired');
    }
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = {
  asureAuth,
};
