const ffmetadata = require("ffmetadata");

function writeMetadata(path, filename, data) {
  ffmetadata.write(`${path}/${filename}`, data, function (error) {
    if (error) {
      console.error("Error writing metadata", error);
    }
  });
}

module.exports = writeMetadata;