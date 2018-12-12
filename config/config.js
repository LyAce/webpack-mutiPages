const fs = require('fs');
//获取所有页面 生成多页面的集合
const getFileNameList = path => {
    let fileList = [];
    let dirList = fs.readdirSync(path);
    dirList.forEach(item => {
        if (item.indexOf('html') > -1) {
            fileList.push(item.split('.')[0]);
        }
    });
    return fileList;
};
let HTMLDirs = getFileNameList('./app/pages');

module.exports = {
    HTMLDirs:HTMLDirs,
    imgOutputPath:"img/",
    cssPublicPath:"../",
    cssOutputPath:"./css/styles.css",//将所有css提取到dist文件夹下的css文件夹中，并命名为style.css
    devServerOutputPath:"../dist",
}