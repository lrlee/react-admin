const proxy = require("http-proxy-middleware")
module.exports = function(app){
    app.use(proxy('/api',{
        target:'http://192.168.1.17',
       // target:'http://122.51.163.202',
        changeOrigin:true,
        pathRewrite:{
            '^/api':'/'
        }
    }))
}