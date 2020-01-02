import { func } from "prop-types"

const LOGIN_COOKIE_NAME = 'sessionId'

//判断是否登录
export function isAuthenticated(){
    return _getCookie(LOGIN_COOKIE_NAME)
}


//退出登录
export function logout(){
    _setCookie(LOGIN_COOKIE_NAME,'',0)
}

//获取cookie
function _getCookie(name){
    let start,end
    if(document.cookie.length>0){
        start = document.cookie.indexOf(name+'=')
        if(start!==-1){
            start = start + name.length +1
            end = document.cookie.indexOf(';',start)
            if(end===-1){
                end = document.cookie.length
            }
            return unescape(document.cookie.substring(start,end))
        }
    }
    return ''
}
//设置cookie
function _setCookie(name,value,expire){
    let date = new Date()
    date.setDate(date.getDate()+expire)
    document.cookie = name +'=' + escape(value) +';path=/'+(expire?';expires='+date.toGMUString():'')
}