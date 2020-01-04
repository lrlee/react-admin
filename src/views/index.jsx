import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom'
import Login from '@/views/Login'
import HomePage from '@/views/Home/home'
import PrivateRoute from '@/router/PrivateRoute'
class index extends Component {
    render (){
        return (
            <Switch>
                <Route path='/login' component={Login}/>
                <PrivateRoute path='/' component={HomePage}/>
            </Switch>
        )
    }   
}
export default index;      