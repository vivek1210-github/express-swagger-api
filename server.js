const express = require('express');
const cors = require('cors');
const path = require('path')
const colors = require('colors');
const dotenv = require('dotenv');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});

connectDB();

const coursesRouter = require('./routes/courses');
const categoryRouter  = require('./routes/categories');

app.use(cors());

app.use(express.json());

const staticPath = path.join(__dirname, "public")
app.use(express.static(staticPath))
console.log(staticPath)
var options = {
  customCssUrl: '/css/swagger-custom.css',
  customJs: '/js/swagger-custom.js',
  // customCss: '.swagger-ui .topbar { background: coral;  } .swagger-ui .topbar img { content: url("/images/logo.png"); .swagger-ui .topbar {content: "Online Courses"} }',
  customSiteTitle: "ExpressSwaggerAPI",
  customfavIcon: "/images/logo.png"
};

app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/categories', categoryRouter);
app.use(errorHandler)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Connected to express server at port ${PORT}`.inverse.green.bold)
})

