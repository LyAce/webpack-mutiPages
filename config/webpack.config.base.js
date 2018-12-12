const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");// 引入插件
const CleanWebpackPlugin = require("clean-webpack-plugin");// 清理 dist 文件夹
const ExtractTextPlugin = require("extract-text-webpack-plugin");// 抽取 css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");// 抽取 css

const config = require("./config");//引入多页面文件
let HTMLPlugins = [];//通过html-webpack-plugin生成HTML集合
let Entries = {};//入口文件集合

config.HTMLDirs.forEach((page)=>{
    const htmlPlugin = new HTMLWebpackPlugin({
        filename:`${page}.html`,
        template: path.resolve(__dirname, `../app/pages/${page}.html`),
        chunks: [page, 'commons'],
    });
    HTMLPlugins.push(htmlPlugin);
    Entries[page] = path.resolve(__dirname, `../app/js/${page}.js`);
});

module.exports = {
    entry:Entries,//入口文件
    devtool:'cheap-module-source-map',//启用sorceMap
    output:{//输出文件
        filename:"js/[name].[hash:5].bundle.js",
        path:path.resolve(__dirname,"../dist")
    },
    module:{//加载器
        rules:[
            {
                test:/\.html$/,
                use:{
                    loader:'html-loader'
                }
            },
            // {
            //   test:/\.css$/,
            //   exclude:/node_modules/,
            //   use:["style-loader","css-loader"]
            // },
            // {//使用extractTextPlugin 抽离css
            //     test:/\.css$/,// 对 css 后缀名进行处理
            //     exclude: /node_modules/,// 不处理 node_modules 文件中的 css 文件
            //     use: ExtractTextPlugin.extract({  // 抽取 css 文件到单独的文件夹
            //         fallback: "style-loader",
            //         publicPath: config.cssPublicPath, // 设置 css 的 publicPath
            //         use: "css-loader"
            //     })
            // },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:{
                    loader:"file-loader",
                    options:{
                        // 打包生成图片的名字
                        name:"[name].[ext]",
                        // 图片的生成路径
                        outputPath:config.imgOutputPath
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use:["file-loader"]
            }


        ]
    },
    plugins:[
        // 自动清理 dist 文件夹
        new CleanWebpackPlugin(["dist"]),
        // 将 css 抽取到某个文件夹
        // new ExtractTextPlugin(config.cssOutputPath),//使用extractTextPlugin 没有hash值方法
        new MiniCssExtractPlugin({//使用minicssextractplugin 有hash值方法
            filename: "./css/[name].[contenthash:5].css",
        }),
        ...HTMLPlugins
    ],
};