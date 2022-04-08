#!/usr/bin/env node

const path = require("path");
const { NodeSSH } = require("node-ssh");
const config = require(path.resolve(process.cwd(), './deploy.config.js'));
// console.log("config", config);
const ssh = new NodeSSH();
const remotePath = config.remote;
const pushDir = path.resolve(process.cwd(), config.origin);
// 完善部分：
// 1.提供回退部署，build_bak不存在则报错；把build删除，build_bak改为build。
// console.log('222')
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
                            console.log(status ? "deploy success" : "deploy error");
                            process.exit(0);
                        });
                });
        }).catch(function (err) {
            console.log(1111);
            console.log(err);
        });
    });
// module.exports = function () { console.log(233) };