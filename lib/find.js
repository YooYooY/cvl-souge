const request = require('./request')
const { getFindSongUrl } = require("../config");

module.exports = async (song, findName) => {
    const url = getFindSongUrl(song.id)
    const { data: res } = await request(url)
    return { song, res, findName }
}