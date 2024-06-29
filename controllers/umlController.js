const plantumlService = require('../services/plantumlService');
const db = require('../db/database');
const config = require('../config');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

exports.generateUML = async (req, res) => {
    try {
      const { code } = req.body;
  
      if (!code) {
        return res.status(400).json({ error: 'PlantUML code is required' });
      }
  
      const image = await plantumlService.generateDiagram(code);
      const fileName = `${uuidv4()}.png`;
      const filePath = path.join(config.imagePath, fileName);
  
      await plantumlService.saveImage(filePath, image);
      await db.insertImage(fileName, filePath);
  
      const imageUrl = `${req.protocol}://${req.get('host')}/images/${fileName}`;
      res.json({ imageUrl });
    } catch (error) {
      console.error('Error generating UML:', error);
      res.status(500).json({ error: 'Failed to generate UML diagram' });
    }
  };