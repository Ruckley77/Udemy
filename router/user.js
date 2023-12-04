const express = require('express');
const md_multiparty = require('../middlewares/multiparty');
const userController = require('../controllers/user');
const md_auth = require('../middlewares/auth');

const api = express.Router();

api.get('/user', [md_auth.asureAuth], userController.readMe);
api.get('/users', [md_auth.asureAuth], userController.readUsers);
api.post(
  '/user',
  [md_auth.asureAuth, md_multiparty],
  userController.createUser
);
api.patch(
  '/user/:id',
  [md_auth.asureAuth, md_multiparty],
  userController.updateUser
);
api.delete(
  '/user/:id',
  [md_auth.asureAuth, md_multiparty],
  userController.deleteUser
);

module.exports = {
  api,
};
