// Here is all Express Config
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { API_VERSION } = require('./constants');

const exp = express();

// Import routings
const authRoutes = require('./router/auth');
const clientRoutes = require('./router/clients');
const userRoutes = require('./router/user');
const menuRoutes = require('./router/menu');
const courseRoutes = require('./router/course');
const postRoutes = require('./router/post');
const newsletterRoutes = require('./router/newsletter');
// Configure Body Parse: What we receive from the client to the server
exp.use(bodyParser.urlencoded({ extended: true }));
exp.use(bodyParser.json()); //with this, our server can now receive json in the body of the request

//Configure static folder
exp.use(express.static('uploads'));

// Configure Header HTTP - CORS
exp.use(cors());

// Configure routings
exp.use(`/api/${API_VERSION}`, authRoutes.api);
exp.use(`/api/${API_VERSION}`, clientRoutes.clientapi);
exp.use(`/api/${API_VERSION}`, userRoutes.api);
exp.use(`/api/${API_VERSION}`, menuRoutes.api);
exp.use(`/api/${API_VERSION}`, courseRoutes.api);
exp.use(`/api/${API_VERSION}`, postRoutes.api);
exp.use(`/api/${API_VERSION}`, newsletterRoutes.api);

module.exports = exp;
