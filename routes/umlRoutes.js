const express = require('express');
const umlController = require('../controllers/umlController');

const router = express.Router();

router.post('/generate-uml', umlController.generateUML);

module.exports = router;