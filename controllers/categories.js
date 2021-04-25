const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async')
const Category = require('../models/Category');

exports.getCategories = asyncHandler(async (req, res, next) => {
    const categories =  await Category.find().populate({
      path: 'courses',
      select: {name:1, category:0}
    });
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    })
});

exports.deleteCategory = asyncHandler( async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if(!category) {
        return next(new ErrorResponse(`Category not found with id ${req.params.id}`), 404);
    }
    category.remove();
    res.status(200).json({
      success: true,
      data: {}
    })
});