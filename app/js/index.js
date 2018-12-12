require('../css/aaa.css');
require('./common.js');
console.log('hello world');
const imgSrc = require('../images/fj.jpg');
let oImg = new Image();
oImg.src=imgSrc;
document.body.appendChild(oImg);