const exp = require('express');
const ClientsController = require('../controllers/clients');

const clientapi = exp.Router();

clientapi.post('/clients', ClientsController.create);

clientapi.get('/clients', ClientsController.read);

clientapi.patch('/clients/:id', ClientsController.upt);

clientapi.delete('/clients/:id', ClientsController.del);

// clientapi.get('/clients', ClientsController.read)

module.exports = {
  clientapi,
};
