const filter = require('./filter');

function getSingleInfo(json) {
  const urls = [`${json.additionalProperty[3].value}`];
  const tracks = [];

  const artist = json.byArtist.name;
  const album = json.name;
  const album_artist = json.byArtist.name;

  const track_number = 1;
  const title = json.name;

  const cover = json.publisher.image;

  const track = {
    title: title,
    artist: artist,
    track: track_number,
    album: album,
    album_artist: album_artist,
    filename: `${filter(title)}.mp3`
  }

  tracks.push(track);

  return {artist, album, tracks, urls, cover};
}

function printSingleInfo(json) {
  
  console.log(`\nDigital Track: ${json.name}\n`);

  console.log(`1. ${json.name}`);

}

module.exports = {
  getSingleInfo: getSingleInfo,
  printSingleInfo: printSingleInfo
};