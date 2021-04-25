const express = require('express');
const router = express.Router();
const { getCategories, deleteCategory } = require('../controllers/categories');

router.route('/').get(getCategories);

router.route('/:id').delete(deleteCategory);

module.exports = router;