# Webpack4.x配置

## 基础配置

使用`yarn init`快速初始化项目文件。

增加根目录下增加`src\`文件夹，`src`文件夹下增加`index.html`和`index.js`文件。

使用`yarn add webpack webpack-cli -D`全局安装`webpack`和`webpack-cli`，在根目录下增加`webpack.config.js`文件用于配置`webpack`。

在`webpack.config.js`文件中增加`module.exports = {}`，表示`webpack`打包的入口文件，在`{}`配置所有有关`webpack`的打包依赖，这里增加键值对`mode: 'development'`表示打包模式使用的是`development`。由于`webpack4.x`打包的默认的入口文件是src\index.js，所以不要去重命名`index.js`。

在命令行内使用`webpack`命令进行打包，打包后会在根目录下出现`dist\main.js`，这便是打包后的文件。

## 实时打包

在`基础配置`中我们修改了`index.js`文件是无法让`webpack`实时更新打包的，必须重新使用`webpack`命令才能重新打包，但我们可以使用`webpack-dev-server`工具来让`webpack`对更新的内容进行实时打包。

需要在命令行使用`jarn add webpack-dev-server`安装`webpack-dev-server`，然后在`package.json`文件中进行配置，如果没有`scripts`键值对，则需要增加`'scripts': {}`键值对，在`{}`中进行配置。花括号内增加`"dev": "webpack-dev-server --open --port 3000 --hot --host 127.0.0.1"`内容。

`"dev"`是启动服务器的简短命令，有了它就可以使用`yarn run dev`来驱使`webpack-dev-server`启动。`--open`表示打开默认的浏览器，可以在这个参数后增加其它浏览器的名称。`--port 3000`指定打开的服务器端口为`3000`。`--hot`能够使得`webpack-dev-server`来热更新项目中的模块内容。`--host 127.0.0.1`指定主机名为`127.0.0.1`。

现在使用`yarn run server`命令就可以驱动默认的浏览器打开项目文件的内容了。

`webpack-dev-server`会让`src/index.js`作为整个根目录下`index/js`，但是这个文件是存在于内存当中的，如果在主页内容`index.html`的`<script>`标签的`src`属性指定为`./index.js`便能访问到这个“隐藏”的文件。


