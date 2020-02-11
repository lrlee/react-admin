import {USER_INFO} from './actionTypes'

export default (
    state={
        //用户信息
        user:sessionStorage.getItem("userInfo") && JSON.parse(sessionStorage.getItem("userInfo"))
    },
    action
)=>{
    switch(action.type){
        case USER_INFO:
            return {...state,user:action.payload}
        default:
            return state;
    }
}