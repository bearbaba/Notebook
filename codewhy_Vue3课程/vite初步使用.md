npm install vite -D

webpack 的弊端大而复杂

不需要后缀名了

不需要访问node_modules了

npx vite

npm install less -D

效率比webpack高

默认情况下 vite 能识别 ts

vite2 搭建本地服务器，使用本地服务器 Connect

vite 将 ts,less 转化为 es6 文件

App.vue --> es6_modules

vite 对 vue的支持

![image-20210706232120163](https://gitee.com/peng_zhi_hung/img-res/raw/master/image-20210706232120163.png)

![image-20210706232147597](https://gitee.com/peng_zhi_hung/img-res/raw/master/image-20210706232147597.png)

插件必须要进行配置，vite.config.js

![image-20210706232304074](https://gitee.com/peng_zhi_hung/img-res/raw/master/image-20210706232304074.png)

安装 compiler-sfc -D

![image-20210706232331354](https://gitee.com/peng_zhi_hung/img-res/raw/master/image-20210706232331354.png)

vite 能够预打包，速度能够变快。

vite 打包项目

npx vite build

第三方打包后放入`assets`

![image-20210706232759034](https://gitee.com/peng_zhi_hung/img-res/raw/master/image-20210706232759034.png)

vite 使用到了 ESBuild

ESBuild 超快的构建速度，并且不需要缓存；

支持ES6和CommonJS的模块化

支持Go、JS的Api

![image-20210706233000428](https://gitee.com/peng_zhi_hung/img-res/raw/master/image-20210706233000428.png)

![image-20210706233026364](https://gitee.com/peng_zhi_hung/img-res/raw/master/image-20210706233026364.png)

ESBuild使用Go语言进行编写，能够直接转换成机器代码，而无需经过字节码。

ESBuild可以充分利用CPU的内核，饱和运行。

设计时考虑到了性能问题。尽可能不依赖第三方包。

vite 脚手架搭建

![image-20210706233251892](https://gitee.com/peng_zhi_hung/img-res/raw/master/image-20210706233251892.png)

