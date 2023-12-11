const express = require('express');
const multiparty = require('connect-multiparty');
const courseController = require('../controllers/course');
const md_auth = require('../middlewares/auth');
const md_image = multiparty({ uploadDir: './uploads/course' });
const api = express.Router();

api.post(
  '/course',
  [md_auth.asureAuth, md_image],
  courseController.createCourse
);
api.get('/courses', courseController.getCourses);
api.patch(
  '/course/:id',
  [md_auth.asureAuth, md_image],
  courseController.updateCourse
);
api.delete('/course/:id', [md_auth.asureAuth], courseController.deleteCourse);

module.exports = { api };
