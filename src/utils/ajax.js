import qs from 'qs';
import axios from 'axios'
let baseURL='http://122.51.163.202:8080'
let service = axios.create({
    baseURL,
    //如果请求超过了'timeout'的时间，请求将被中断
    timeout:30000,
    //表示跨域请求时是否需要使用凭证
    // withCredentials:true,
    // crossDomain:true,
<<<<<<< HEAD
    headers: {
        'Authorization': sessionStorage.getItem("token")
    }
=======
    // headers: {
    //     'Authorization': sessionStorage.getItem("token")
    // }
>>>>>>> 310310aa2c10b6b2288d339143e98341148abb98
})

//添加请求拦截器
service.interceptors.request.use(
    config=>{
        console.log(config,"config")
        if(config.url.indexOf('userController/login.do')===-1){
            config.headers['Authorization']=sessionStorage.getItem("token")
        }
        return config
    },
    error=>{
        throw error;
    }
)
//添加响应拦截器
service.interceptors.response.use(
    response=>{
        if(!response.data.result && response.data.msg=='尚未登陆！'){//token过期，跳转到登录页
            window.location='/login'
        }
        return response
    },
    error=>{
        console.log(error,"error")
        throw error
    }
)

export default service;