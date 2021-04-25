const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc - Get all courses list
// @route - GET /api/v1/courses
// @access - Public
exports.getCourses = asyncHandler( async (req, res, next) => {  
  let query;
  console.log(req.query)
  let reqQuery = {...req.query};

  // fields to remove from query
  const removeFields = ['page', 'limit', 'sort'];
  removeFields.forEach(param => delete reqQuery[param]);
  
  let queryString = JSON.stringify(reqQuery)
  queryString = queryString.replace(/\b(lte|lt|gt|gte|in)\b/g, match => `$${match}`)
 
  query = Course.find(JSON.parse(queryString));

  // sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    if(req.query.sort == 'asc') {
      query = query.sort('price')
    } else if (req.query.sort == 'desc' ) {
      query = query.sort('-price')
    }
    
  } else {
    query = query.sort('-_id')
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  query = query.skip(startIndex).limit(limit);

  // execute query
  const courses = await query.populate('category');

  // Pagination
    let pagination = {};

    pagination.next = {
      next: page + 1,
      limit: limit
    }

    pagination.prev = {
      prev: page - 1,
      limit: limit
    }

  res.status(200).json({
    success: true,
    count: courses.length,
    pagination,
    data: courses    
  });
});

// @desc - Get single course
// @route - GET /api/v1/courses/:id
// @access - Public
exports.getCourse = asyncHandler(async (req, res, next) => { 
  const course = await Course.findById(req.params.id);
  res.status(200).json({
    success: true,
    data: course
  })  
});

// @desc - Create course
// @route - POST /api/v1/courses
// @access - Public
exports.addCourse = asyncHandler( async (req, res, next) => {   
  let course = await Course.findOne({name: req.body.name});   
  course = await Course.create(req.body);
  res.status(201).json({success: true, data: course })
});

// @desc - Update course
// @route - PUT /api/v1/courses/:id
// @access - Public
exports.updateCourse = asyncHandler( async (req, res, next) => { 
  let course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if(!course) { 
     return next('Course id not found')       
  }
  res.status(201).json({success: true, data: course }) 
});

// @desc - Delete course
// @route - DELETE /api/v1/courses/:id
// @access - Public
exports.deleteCourse = asyncHandler( async (req, res, next) => {
  let course = await Course.findByIdAndRemove(req.params.id);
  if(!course) { 
      next(err)      
  }
  res.status(201).json({success: true, data: course });
})