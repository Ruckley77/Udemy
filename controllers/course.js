const Course = require('../models/course');
const Image = require('../utils/image');

async function createCourse(req, res) {
  try {
    const course = new Course(req.body);
    const imagePath = Image.getFilePath(req.files.miniature);

    course.miniature = imagePath;
    await course.save();
    res.status(200).send(course);
  } catch (error) {
    res.status(400).send(`${error}, error creating course`);
  }
}

async function getCourses(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };
    const paginateCourses = await Course.paginate({}, options);
    if (!paginateCourses) {
      return res.status(400).send('could not paginate');
    }

    res.status(200).send(paginateCourses);
  } catch (error) {
    res.status(400).send(`${error}, error getting course(s)`);
  }
}

async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const courseData = req.body;

    if (req.files.miniature) {
      const imagePath = Image.getFilePath(req.files.miniature);
      courseData.miniature = imagePath;
    }

    const existingCourse = await Course.findByIdAndUpdate(id, courseData);

    if (!existingCourse) {
      return res.status(404).send('cant find course to update');
    }
    res.status(200).send(existingCourse);
  } catch (error) {
    res.status(400).send(`${error}, Error updating course`);
  }
}

async function deleteCourse(req, res) {
  try {
    const { id } = req.params;

    const existingCourse = await Course.findByIdAndDelete(id);

    if (!existingCourse) {
      return res.status(404).send('cant find course to delete');
    }

    res.status(200).send(existingCourse);
  } catch (error) {}
}

module.exports = { createCourse, getCourses, updateCourse, deleteCourse };
