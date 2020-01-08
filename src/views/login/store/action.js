import {
    USER_INFO,
    LOGIN_STATUS
} from './actionTypes'

export const actionUserInfo=user=>({
    type:USER_INFO,
    payload:user
})
// export const actionLoginStatus=status=>({
//     type:LOGIN_STATUS,
//     payload:status
// })