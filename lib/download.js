const https = require("https");
const fs = require("fs");
const path = require("path");
const ora = require('ora');
const inquirer = require("inquirer");
const ProgressBar = require("./progress");

const spinner = ora();
const { downloadTarget } = require("../config");

const checkExit = (file) => {
    return new Promise((resolve, reject) => {
        fs.access(file, fs.constants.F_OK, (err) => {            
            err ? resolve(false) : resolve(true)
        });
    })
}

module.exports = ({ song, res:{ url, type }, findName }) => {
    return new Promise(async (resolve, reject) => {
        let name = song.name;
        let dest = path.join(downloadTarget, name + "." + type);

        const isExit = await checkExit(dest);

        if (isExit) {
            const { confirm } = await inquirer.prompt({
                type: 'confirm',
                name: 'confirm',
                message: '已存在同名的文件，仍然下载？',
                default: true
            });
            if (!confirm) reject("取消下载")
            name = name + "_" + Date.now();
            dest = path.join(downloadTarget, name + "." + type);
        }

        const file = fs.createWriteStream(dest);

        // spinner.start("开始下载");

        https.get(url, (res) => {
        	let data = 0;
        	let total = res.headers["content-length"]*1;

    		const progress = new ProgressBar("下载进度",50);
        	res.on('data', function (chunk) {
        		data+=chunk.length;
        		let completed = Math.floor((data/total)*100);
        		progress.render({completed,total:100});
        		// spinner.text = "已下载 "+ Math.floor((data/total)*100) + "%";
			});

            res.on("end", () => {});

            file.on("finish", () => {
            	progress.clear();
            	spinner.succeed(`${name} 下载成功！`);
                file.close(resolve);
            });
            file.on("error", (error) => {
            	spinner.fail("下载出错了~请重新尝试");
                fs.unlink(dest);
                reject(err)
            })

            res.pipe(file);
        })

    })
}