const request = require("./request")
const {getSearchSongUrl} = require("../config");

module.exports = (name) => {
    const url = getSearchSongUrl(encodeURI(name))
    return request(url)
}