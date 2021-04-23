const express = require('express');
const cors = require('cors')
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const coursesRouter = require('./routers/courses');

app.use(cors());

app.use(express.json());

app.use('/api/v1/courses', coursesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Connected to express server at port ${PORT}`)
})