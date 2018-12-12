const webpackBase = require("./webpack.config.base");// 引入基础配置文件
const webpack = require('webpack');
const webpackMerge = require("webpack-merge");// 引入 webpack-merge 插件
const config = require("./config");// 引入配置文件
// 合并配置文件
module.exports = webpackMerge(webpackBase,{
   // plugins:[
   //     // // 代码压缩
   //     // new webpack.optimize.UglifyJsPlugin({
   //     //     // 开启 sourceMap
   //     //     sourceMap: true
   //     // }),
   //     // 提取公共 JavaScript 代码
   //     new webpack.optimize.CommonsChunkPlugin({
   //         // chunk 名为 commons
   //         name: "commons",
   //         filename: "[name].bundle.js",
   //     }),
   // ]
    optimization:{
        splitChunks:{
            name:'commons',
            filename:"[name].bundle.js"
        }
    }
});
