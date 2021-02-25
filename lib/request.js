const ora = require('ora');
const https = require("https");

const spinner = ora();

module.exports = (url) => new Promise((resolve, reject) => {
    https.get(url, (req, res) => {
        let data = [];
        
        spinner.start("加载中...");

        req.on("data", chunk => {
            data.push(chunk)
        });
        req.on("end", () => {
            try {              
                spinner.stop();
                resolve(JSON.parse(data.join("")))
            } catch (err) {
                spinner.fail("<== API 服务器可能挂了，请稍后重试！ ==>")
                reject(err.message);
            }
        });
        req.on("error",()=>{
            spinner.fail("请检查网络~");
        })
    })
})