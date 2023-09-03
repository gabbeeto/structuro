const html = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './input/buttons.js',
  devTool: 'inline-source-map'.
    plugins: [{ new html{ template: './input/index.html' }
}],
output: {
  fileName: '[name][contentHash][ext]',
    path: path.resolve(__dirname, 'output'),
      clean: true,
        assetModuleFilename: '[name][ext]',
},
module: {
  rules: [{ test: /\.css$/i, use: ['style-loader', 'css-loader'] }, { test: /\.(ttf|otf)$/i, type: 'asset/resource' }
  ]
}



}
