const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} =  require('../controllers/courses');

// api/v1/courses - Http Verbs: GET, POST
router
.route('/')
.get(getCourses)
.post(addCourse);

// api/v1/courses/:id - Http Verbs: GET, PUT, DELETE
router
  .route('/:id')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;