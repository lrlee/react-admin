import {USER_INFO,NAV_INFO} from './actionTypes'

export default (
    state={
        //用户信息
        user:sessionStorage.getItem("userInfo") && JSON.parse(sessionStorage.getItem("userInfo")),
        navInfo:sessionStorage.getItem("navInfo") && JSON.parse(sessionStorage.getItem("navInfo"))
    },
    action
)=>{
    switch(action.type){
        case USER_INFO:
            return {...state,user:action.payload}
        case NAV_INFO:
            return {...state,navInfo:action.payload}
        default:
            return state;
    }
}