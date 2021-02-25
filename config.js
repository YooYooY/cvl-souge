const {resolve} = require("path");

module.exports = {
	downloadTarget: resolve(__dirname,"./music/"),
    getSearchSongUrl: (name) => 'https://musicapi.leanapp.cn/search?limit=100&keywords=' + name,
    getFindSongUrl: (songId) => 'https://api.imjad.cn/cloudmusic/?type=song&br=128000&id=' + songId,
}