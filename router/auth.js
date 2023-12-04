const exp = require('express');
const AuthController = require('../controllers/auth');

const api = exp.Router();

api.post('/auth/register', AuthController.register);
api.post('/auth/login', AuthController.login);
api.post('/auth/refresh_access_token', AuthController.refreshAccessToken);
api.get('/auth/register', AuthController.obtain);

module.exports = {
  api,
};
