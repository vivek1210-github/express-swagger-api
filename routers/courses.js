const express = require('express');
const router = express.Router();

// get
router.get('/', (req, res, next) => {  
  res.status(200).json({
    success: true,
    data: [{id:1, name: 'Html css', 'description': 'code with mosh course', price: 500, isPublished: true}]
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
router.post('/', (req, res, next) => { 
console.log(req.body)
  req.body.id = '3fa85f64-5717-4562-b3fc-2c963f66afa4';
  res.status(201).json({
    success: true,
    data: req.body
  })
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