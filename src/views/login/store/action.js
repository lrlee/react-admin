import {
    USER_INFO,
    LOGIN_STATUS,
    NAV_INFO
} from './actionTypes'

export const actionUserInfo=user=>({
    type:USER_INFO,
    payload:user
})
export const actionNavInfo = nav =>({
    type:NAV_INFO,
    payload:nav
})
// export const actionLoginStatus=status=>({
//     type:LOGIN_STATUS,
//     payload:status
// })