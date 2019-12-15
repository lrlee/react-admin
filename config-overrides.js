const {override,addLessLoader,fixBabelImports,addWebpackAlias} = require('customize-cra');
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = override(
    addWebpackAlias({
        '@':resolve("src")
    }),
    addLessLoader({
        javascriptEnabled:true
    }),
    fixBabelImports('import',{
        libraryName:'antd',
        libraryDirectory:'es',
        style:true
    })
)