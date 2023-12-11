const express = require('express');
const newsletterController = require('../controllers/newsletter');

const md_auth = require('../middlewares/auth');

const api = express.Router();

api.post('/newsletter', newsletterController.subscribeNewsletter);
api.get(
  '/newsletters',
  [md_auth.asureAuth],
  newsletterController.getsubscribeNewsletter
);
api.delete(
  '/newsletter/:id',
  [md_auth.asureAuth],
  newsletterController.deletesubscribeNewsletter
);

module.exports = { api };
