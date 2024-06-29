const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const config = require('./config');
const umlRoutes = require('./routes/umlRoutes');
const db = require('./db/database');
const cleanupService = require('./services/cleanupService');

const app = express();

// Load Swagger document
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use('/api', umlRoutes);

db.init();
cleanupService.startCleanupTask();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`API documentation available at http://localhost:${config.port}/api-docs`);
});