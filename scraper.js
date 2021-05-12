const {isAlbum, getAlbumInfo, printAlbumInfo} = require('./src/getAlbumInfo');
const {getSingleInfo, printSingleInfo} = require('./src/getSingleInfo');
const downloadFiles = require('./src/downloadFiles');
const axios = require('axios');
const cheerio = require('cheerio');

const url = process.argv.slice(2).join('');

// Gets the .json file from the URL
axios(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const head = $('head');

    head.each(function () {

        const json = $(this).find('script[type="application/ld+json"]').html();

        let songInfo;
        if (isAlbum(JSON.parse(json))) {
            printAlbumInfo(JSON.parse(json));
            songInfo = getAlbumInfo(JSON.parse(json));
        } else {
            printSingleInfo(JSON.parse(json));
            songInfo = getSingleInfo(JSON.parse(json));
        }

        downloadFiles(songInfo);

    });

}).catch(console.error);