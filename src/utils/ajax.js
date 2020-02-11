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
    headers: {
        'Authorization': sessionStorage.getItem("token")
    }
})

//添加请求拦截器
service.interceptors.request.use(
    config=>{
        console.log(config,"config")
        return config
    },
    error=>{
        throw error;
    }
)
//添加响应拦截器
service.interceptors.response.use(
    response=>{
        console.log(response,"response")
        return response
    },
    error=>{
        console.log(error,"error")
        throw error
    }
)

export default service;