# xiao-deploy-tool

基于 ssh 上传文件夹到服务端，可以轻松实现前端的部署，简单的 CD 工具

## Install

```
npm i xiao-deploy-tool -g
```

## Usage

在项目根目录下创建`deploy.config.js`,内容如下：

```js
module.exports = {
  // ip
  host: "192.168.23.58",
  // 端口
  port: 22,
  username: "root",
  password: "cerv2ix",
  // 要发送的文件夹
  origin: "build",
  // 传送到服务端的这个文件夹下
  remote: "/home/CVSInferFrontendGo",
};
```

在`package.json`里加入

```js
"scripts": {
    "bd": "build命令(如vite build)&&xiao-deploy-tool",
    "deploy":"xiao-deploy-tool"
  },
```

需要打包并部署时，在终端执行`npm run bd`

仅需要部署时,执行`npm run deploy`

成功后会输出 `deploy success`

- 出于服务端的账号密码隐私保护，建议在`.gitignore`中添加`deploy.config.js`

```
创建deploy.config.js

在.gitignore添加deploy.config.js

git rm --cached deploy.config.js

git add .

git commit -m "Update .gitignore"

```

## 后续

1.检测有没有配置文件的存在

2.判断配置文件里配置的信息是否存在，包括文件夹是否存在

3.使用远程的备份去部署

4.改用 ts

5.加入 husky
