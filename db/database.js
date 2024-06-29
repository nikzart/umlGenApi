const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db;

exports.init = () => {
  db = new sqlite3.Database(path.join(__dirname, 'uml_images.db'));
  db.run(`CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fileName TEXT,
    filePath TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
};

exports.insertImage = (fileName, filePath) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO images (fileName, filePath) VALUES (?, ?)', [fileName, filePath], function(err) {
      if (err) reject(err);
      else resolve(this.lastID);
    });
  });
};

exports.getOldImages = (cutoffTime) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM images WHERE createdAt < ?', [cutoffTime.toISOString()], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.deleteImage = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM images WHERE id = ?', [id], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};