const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});

connectDB();

const coursesRouter = require('./routes/courses');

app.use(cors());

app.use(express.json());

app.use('/api/v1/courses', coursesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Connected to express server at port ${PORT}`.inverse.green.bold)
})