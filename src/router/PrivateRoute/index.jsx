import React, { Component } from 'react'
import {Route,Redirect} from 'react-router-dom'
import {isAuthenticated} from '@/utils/Session'
console.log(isAuthenticated(),"isAuthenticated")
const PrivateRoute = ({component:Component,...rest})=>(
    <Route
        {...rest}
        render={(props)=>(
            !!isAuthenticated()?<Component {...props} />:<Redirect to={{pathname:'/login',state:{title:'登录'}}}/>
        )}
    />
    // <Route
    //     {...rest}
    //     render={(props)=>(
    //         <Component {...props} />
    //     )}
    // />
)

export default PrivateRoute