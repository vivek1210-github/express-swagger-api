const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// get
router.get('/', async (req, res, next) => {  
  const courses = await Course.find();
  res.status(200).json({
    success: true,
    data: courses
  })
});

// Get single course by id
router.get('/:id', (req, res, next) => {  
  
  res.status(200).json({
    success: true,
    data: {id: req.params.id}
  })
})

// post
router.post('/', async (req, res, next) => { 
  try {
    console.log(req.body.name)
    let course = await Course.findOne({name: req.body.name});
    console.log(course)
    if(course) {
      return res.status(400).json({
        success: true,
        data: {},
        error: 'Course name already taken'
      })
    }
     course = await Course.create(req.body);
   
    res.status(201).json({
      success: true,
      data: course
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: true,
      data: {},
      error: err.message
    })
  }
})


// put
router.put('/:id', (req, res, next) => {  
  res.status(200).json({
    success: true,
    data: {id: req.params.id}
  })
})


// delete
router.delete('/:id', (req, res, next) => {  
  res.status(200).json({
    success: true,
    data: {id: req.params.id}
  })
})

module.exports = router;