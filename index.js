//Here will be our connection to our DB

// Import Mongoose to the file
const mongoose = require('mongoose');
// Import Express from the file
const express = require('./app');
//Import the information from the file
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  API_VERSION,
  IP_SERVER,
} = require('./constants');

const PORT = process.env.PORT || 3977;

//Connect to Database, go to the website and copy the information, and edit it accordingly.
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`
    );
    express.listen(PORT, () => {
      console.log('API REST');
      console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
    });
  } catch (err) {
    console.log('Could not connect to DB, please check err:', err);
  }
};

connectDB();
