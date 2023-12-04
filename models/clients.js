const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  cc: String,
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
