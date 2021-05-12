const filter = require('./filter');

function getAlbumInfo(json) {
  const urls = [];
  const tracks = [];

  const artist = json["byArtist"].name;
  const album = json.albumRelease[0].name;
  const album_artist = json["byArtist"].name;

  const cover = json.albumRelease[0].image.join('');

  console.log();

  for (i = 0; i < json.track.numberOfItems; i++) {
    const url = json.track.itemListElement[i].item.additionalProperty[2].value;

    const track_number = i + 1;
    const title = json.track.itemListElement[i].item.name;

    const track = {
      title: title,
      artist: artist,
      track: track_number,
      album: album,
      album_artist: album_artist,
      filename: `${filter(title)}.mp3`
    }

    if (url == "all_rights_reserved") {
      console.log(`"${title}" is not available.`);
    } else {
      urls.push(url);
      tracks.push(track);
    }
    
  }

  // Checks if tracks array has duplicate titles
  const titles = tracks.map( (element) => element.title );
  const hasDuplicates = titles.map( (element, index) => titles.indexOf(element) == index).includes(false);
  if (hasDuplicates) {
    // If so, enumerates each filename
    console.log("\nAlbum has songs with the same name. Enumerating them...\n");
    tracks.map( (element, index) => element.filename = `${index+1}. ${element.filename}` );
  }

  return {artist, album, tracks, urls, cover};
}

function printAlbumInfo(json) {
  
  console.log(`\nDigital Album: ${json.albumRelease[0].name}\n`);

  for (i = 0; i < json.track.numberOfItems; i++) {
    let title = json.track.itemListElement[i].item.name;
    console.log(`${i+1}. ${title}`);
  }

}

function isAlbum(json) {
  return json.hasOwnProperty("albumRelease");
}

module.exports = {
  isAlbum: isAlbum,
  getAlbumInfo: getAlbumInfo,
  printAlbumInfo: printAlbumInfo
};