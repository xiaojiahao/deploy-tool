const path = require('path');
const { NodeSSH } = require("node-ssh");
const config = require(path.resolve(process.cwd(), './deploy.config.js'));

const ssh = new NodeSSH();
const remotePath = config.remote;
const pushDir = path.resolve(process.cwd(), config.origin);
// 完善部分：
// 1.提供回退部署，build_bak不存在则报错；把build删除，build_bak改为build。
ssh
    .connect({
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
    })
    .then(function () {
        // 删除备份
        ssh.execCommand(`rm -rf ${remotePath}/build_bak`).then(function (res) {
            // 进行备份
            ssh
                .execCommand(`mv ${remotePath}/${config.origin} ${remotePath}/build_bak`)
                .then(function (res) {
                    // 上传
                    ssh
                        .putDirectory(pushDir, `${remotePath}/${config.origin}`)
                        .then(function (status) {
                            console.log(status ? "部署成功" : "部署失败");
                            process.exit(0);
                        });
                });
        }).catch(function (err) {
            console.log(err);
        });
    });
