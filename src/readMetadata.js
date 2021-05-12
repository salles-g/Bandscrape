const ffmetadata = require("ffmetadata");

function readMetadata(path, filename) {
  ffmetadata.read(`${path}/${filename}`, function (error, data) {
    if (error) {
      return "Error reading metadata" + error;
    } else {
      return data;
    }
  });
}

readMetadata("./", "song.mp3");