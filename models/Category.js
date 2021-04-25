const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength:100
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Courses virtual count
CategorySchema.virtual('coursesCount', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'category',  
  count: true
})

// Reverse populate with Virtual 
CategorySchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'category',
  justOne: false 
})

// Cascade delete courses when category is deleted
CategorySchema.pre('remove', async function(next) {
    console.log(`Delete courses by category id ${this._id}`);
    await this.model('Course').deleteMany({category: this._id});
})



module.exports = mongoose.model('Category', CategorySchema);