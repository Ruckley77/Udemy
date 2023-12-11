const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const courseSchema = new mongoose.Schema({
  title: String,
  miniature: String,
  description: String,
  url: String,
  price: Number,
  score: Number,
});

courseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Course', courseSchema);
