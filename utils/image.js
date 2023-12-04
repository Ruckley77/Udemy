const path = require('path');

function getFilePath(file) {
  const filePath = file.path;
  const splitPath = filePath.split(path.sep);
  return `${splitPath[1]}/${splitPath[2]}`;
}

module.exports = {
  getFilePath,
};
