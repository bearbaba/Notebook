# Webpack4.x����

## ��������

ʹ��`yarn init`���ٳ�ʼ����Ŀ�ļ���

���Ӹ�Ŀ¼������`src\`�ļ��У�`src`�ļ���������`index.html`��`index.js`�ļ���

ʹ��`yarn add webpack webpack-cli -D`ȫ�ְ�װ`webpack`��`webpack-cli`���ڸ�Ŀ¼������`webpack.config.js`�ļ���������`webpack`��

��`webpack.config.js`�ļ�������`module.exports = {}`����ʾ`webpack`���������ļ�����`{}`���������й�`webpack`�Ĵ���������������Ӽ�ֵ��`mode: 'development'`��ʾ���ģʽʹ�õ���`development`������`webpack4.x`�����Ĭ�ϵ�����ļ���`src\index.js`�����Բ�Ҫȥ������`index.js`��

����������ʹ��`webpack`������д�����������ڸ�Ŀ¼�³���`dist\main.js`������Ǵ������ļ���

## ʵʱ���

��`��������`�������޸���`index.js`�ļ����޷���`webpack`ʵʱ���´���ģ���������ʹ��`webpack`����������´���������ǿ���ʹ��`webpack-dev-server`��������`webpack`�Ը��µ����ݽ���ʵʱ�����

��Ҫ��������ʹ��`jarn add webpack-dev-server`��װ`webpack-dev-server`��Ȼ����`package.json`�ļ��н������ã����û��`scripts`��ֵ�ԣ�����Ҫ����`'scripts': {}`��ֵ�ԣ���`{}`�н������á�������������`"dev": "webpack-dev-server --open --port 3000 --hot --host 127.0.0.1"`���ݡ�

`"dev"`�������������ļ������������Ϳ���ʹ��`yarn run dev`����ʹ`webpack-dev-server`������`--open`��ʾ��Ĭ�ϵ�����������������������������������������ơ�`--port 3000`ָ���򿪵ķ������˿�Ϊ`3000`��`--hot`�ܹ�ʹ��`webpack-dev-server`���ȸ�����Ŀ�е�ģ�����ݡ�`--host 127.0.0.1`ָ��������Ϊ`127.0.0.1`��

����ʹ��`yarn run server`����Ϳ�������Ĭ�ϵ����������Ŀ�ļ��������ˡ�

`webpack-dev-server`����`src/index.js`��Ϊ������Ŀ¼��`index/js`����������ļ��Ǵ������ڴ浱�еģ��������ҳ����`index.html`��`<script>`��ǩ��`src`����ָ��Ϊ`./index.js`���ܷ��ʵ���������ء����ļ���

## ʵʱ��ʾ index.html 

������ʵʱ������򿪵������Ĭ����ʾ����������Ŀ���ļ�Ŀ¼������ϣ���ܹ�ʵʱ��ʾ��Ŀ����ҳ`index.html`�����ݣ��������`index.html`����Ĭ��ȥ����`index.js`�е����ݣ�������ʹ��`<script>`��ǩ�ֶ����룬Ϊ���������������ʹ��һ����Ϊ`html-webpack-plugin`�Ĳ������

ͬ����Ҫʹ��`yarn add html-webpack-plugin`����ȥ��װ����������`webpack`�����ļ�`webpack.config.js`�ļ���������������

����ʹ��`const path = require('path');`����·��ģ�飬Ȼ��ʹ��`const HtmlWebpackPlugin = require('html-webpack-plugin');`����`html-webpack-plugin`ģ�飨���ʱ���������Ѿ�����װ���ˣ���

Ȼ�󴴽��й�`HtmlWebpackPlugin`��ʵ��������

```js
const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'),
    filename: 'index.html'
});//������Ͼ���������������򿪵�����ļ��ˡ�
```

�����`module.exports={}`������`plugins`��ֵ�ԣ���`plugins:[ htmlPlugin ]`��

�������úõ��ļ����ǣ������ϸ��½����õ����ݣ���

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './src/index.html'),
  filename: 'index.html'
})

module.exports={
  mode: 'development',
  plugins: [
    htmlPlugin,
  ]
}
```

