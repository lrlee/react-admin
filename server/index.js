/**
 * asset-require-hook:识别图片资源，对小于8k的图片转换成base64字符串，大于8k的图片转换成路径引用
 * babel-polyfill:提供regenerator运行时和core-js来模拟全功能的ES6环境
 * babel-register:只是一个require钩子，会自动对require命令所加载的js文件进行实时转码。该库只适用于开发环境
 * css-modules-require-hook:只针对样式文件，由于采用的是CSS Modules方案，并且使用SASS来书写代码。所以需要node-sass这个前置编译器来识别
 * 扩展名为.scss的文件。也可以采用less的方式，通过这个钩子，自动提取className哈希字符注入到服务器React组件中
 */
//使用modele-alias插件在node环境下配置别名
const path = require('path')
const moduleAlias = require('module-alias')
moduleAlias.addAlias('@',path.join(__dirname,'../src'));
require("asset-require-hook")({
    extensions:['svg','css','less','jpg','png','gif'],
    name:'/static/media/[name].[ext]'
})
// require('babel-core/register')({
//     ignore:/\/(build|node_modules)\//
// })
require("babel-register")({
    'presets': ["es2015", 'react', 'stage-3']
})
require('babel-polyfill')
require('./server')
console.log(1111)