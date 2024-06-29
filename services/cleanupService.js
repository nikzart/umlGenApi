const fs = require('fs').promises;
const path = require('path');
const db = require('../db/database');
const config = require('../config');

const cleanupImages = async () => {
  const cutoffTime = new Date(Date.now() - config.imageRetentionHours * 60 * 60 * 1000);
  const oldImages = await db.getOldImages(cutoffTime);

  for (const image of oldImages) {
    try {
      await fs.unlink(image.filePath);
      await db.deleteImage(image.id);
      console.log(`Deleted old image: ${image.fileName}`);
    } catch (error) {
      console.error(`Failed to delete image ${image.fileName}:`, error);
    }
  }
};

exports.startCleanupTask = () => {
  setInterval(cleanupImages, 60 * 60 * 1000); // Run every hour
};