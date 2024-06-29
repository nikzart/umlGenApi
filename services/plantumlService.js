const fetch = require('node-fetch');
const fs = require('fs').promises;
const config = require('../config');
const pako = require('pako');

function encode64(data) {
  let r = "";
  for (let i = 0; i < data.length; i += 3) {
    if (i + 2 == data.length) {
      r += append3bytes(data[i], data[i + 1], 0);
    } else if (i + 1 == data.length) {
      r += append3bytes(data[i], 0, 0);
    } else {
      r += append3bytes(data[i], data[i + 1], data[i + 2]);
    }
  }
  return r;
}

function append3bytes(b1, b2, b3) {
  const c1 = b1 >> 2;
  const c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
  const c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
  const c4 = b3 & 0x3F;
  return encode6bit(c1 & 0x3F) + encode6bit(c2 & 0x3F) + encode6bit(c3 & 0x3F) + encode6bit(c4 & 0x3F);
}

function encode6bit(b) {
  if (b < 10) return String.fromCharCode(48 + b);
  b -= 10;
  if (b < 26) return String.fromCharCode(65 + b);
  b -= 26;
  if (b < 26) return String.fromCharCode(97 + b);
  b -= 26;
  if (b == 0) return '-';
  if (b == 1) return '_';
  return '?';
}

exports.generateDiagram = async (code) => {
  const deflated = pako.deflate(code);
  const encoded = encode64(deflated);
  const url = `${config.plantumlServer}~1${encoded}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to generate diagram');
  }

  return response.buffer();
};

exports.saveImage = async (filePath, imageBuffer) => {
  await fs.writeFile(filePath, imageBuffer);
};