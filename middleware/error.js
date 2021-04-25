const ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (err, req, res, next) => {
  console.error(err.stack.red)
  let error = {...err};
  error.message = err.message;
  // console.log(error)
    // Mongoose bad ObjectId
    console.log(`error name: ${err.name}`);
  // error code 11000
  if (err.code === 11000) {
    error = new ErrorResponse(`Duplicate value entered, record already exists`, 400)
  }
  // CastError
  if(err.name === 'CastError') {
    error = new ErrorResponse(`Resource not found with id ${err.value}`, 400)
  }
  // ValidationError
  if(err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(el => el.message)
      error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,   
    error: error.message || 'Server Error'
  })
}


module.exports =  errorHandler;