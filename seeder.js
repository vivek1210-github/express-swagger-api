const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const colors = require('colors')
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'})
const connectDB = require('./config/db');

connectDB();

// model
const Category = require('./models/Category');

// json file
const categories = JSON.parse(fs.readFileSync(path.join(__dirname, '_data', 'category.json'), 'utf-8'));

const importData = async () => {
  try {
      await Category.create(categories);
      console.log(`Data Imported Successfully....`.green.bold);
      process.exit();

  } catch (err) {
    console.log(err)
  }
}

if(process.argv[2] == '-i') {
  importData();
}
