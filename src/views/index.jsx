import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom'
import styled  from 'styled-components';
import {Layout} from 'antd';
import NavBar from '@/views/NavBar';
import Routes from '@/router';
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