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
  ],
  module: { 
    rules:[{
      test: /\.js|jsx$/,
      use: "babel-loader",
      exclude: /node_modules/
    }] 
  },
  resolve: { 
    extensions:['.js', '.jsx', '.json'],
    alias:{
      '@': path.join(__dirname, './src')
    }
  }
}