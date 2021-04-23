const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_LOCAL, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      // need to check hostname part    
      console.log(`Connect to mongo server database`.inverse.green.bold);     
    } catch (err) {
      console.log('Db connection error found '+err)
    }


}

module.exports = connectDB;