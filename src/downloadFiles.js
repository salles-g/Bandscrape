const fs = require('fs');
const axios = require('axios');
const stream = require('stream');
const filter = require('./filter');
const writeMetadata = require('./writeMetadata');

function downloadSongs(songInfo) {
  const artist = songInfo.artist;
  const album = songInfo.album;
  const tracks = songInfo.tracks;
  const urls = songInfo.urls;
  const cover = songInfo.cover;

  // Sets the path as the album name with invalid characters filtered out
  const path = `./downloads/${filter(artist)}/${filter(album)}`;

  // Checks if there are no downloads available
  if (urls.filter(el => el != "all_rights_reserved").length == 0) {
    return console.log(`\nNo downloads available. Returning...`);
  }
  
  // Creates directories with the names of the artist and album respectively
  makeDirectory("./downloads");
  makeDirectory(`./downloads/${filter(artist)}`);
  makeDirectory(path);
  
  // Invokes the downloadSong() function for each of the URLs in the array
  for (url of urls) {
    const index = urls.indexOf(url);
    const track = tracks[index];
    const filename = tracks[index].filename;

    downloadSong(path, track, url)
      .then(console.log(`Downloading file "${filename}".`))
      .catch(function (error) {
        console.log(error);
    });
  }

  // Downloads the album cover
  downloadCover(path, "cover.jpg", cover)
    .then(console.log(`Downloading "cover.jpg"\n`));
}

// Creates a directory if it does not exist
function makeDirectory(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, function(error) {
      if (error) {
        console.log(error);
      }
    });
    console.log(`\nCreated directory "${path}".\n`);
  } else {
    console.log(`\nDirectory "${path}" already exists. Songs will be placed into it.\n`);
  }
}

function downloadSong(path, track, url) {
  const filename = track.filename;

  return axios({
    method: "get",
    url: url,
    responseType: "stream",
  }).then(function (response) {
    const fileStream = response.data.pipe(
      fs.createWriteStream(`${path}/${filename}`)
    );

    return stream.finished(fileStream, function(error) {
      if (error) {
        console.error("Stream failed.", error);
      } else {
        console.log(`Finished downloading "${filename}"`);
        writeMetadata(path, filename, track);
      }
    });
  });

}

function downloadCover(path, filename, url) {

  return axios({
    method: "get",
    url: url,
    responseType: "stream",
  }).then(function (response) {
    const fileStream = response.data.pipe(
      fs.createWriteStream(`${path}/${filename}`)
    );

    return stream.finished(fileStream, function(error) {
      if (error) {
        console.error(`Stream failed. Could not download "${filename}".`, error);
      } else {
        console.log(`Finished downloading "${filename}"`);
      }
    });
  });

}

module.exports = downloadSongs;