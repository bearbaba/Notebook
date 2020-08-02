# Webpack4.x基础配置

使用`yarn init`快速初始化项目文件。

增加根目录下增加`src\`文件夹，`src`文件夹下增加`index.html`和`index.js`文件。

使用`yarn add webpack webpack -D`全局安装`webpack`和`webpack-cli`，在根目录下增加`webpack.config.js`文件用于配置`webpack`。

在`webpack.config.js`文件中增加`module.exports = {}`，表示`webpack`打包的入口文件`，在`{}`配置所有有关`webpack`的打包依赖，这里增加键值对`mode: 'development'`表示打包模式使用的是`development`。由于`webpack4.x`打包的默认的入口文件是`src\index.js`，所以不要去重命名`index.js`。

在命令行内使用`webpack`命令进行打包，打包后会在根目录下出现`dist\main.js`，这便是打包后的文件。




