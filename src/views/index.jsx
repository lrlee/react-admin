import React,{Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import styled  from 'styled-components';
import {Layout} from 'antd';
import NavBar from '@/views/NavBar';
import Routes from '@/router';
const {Sider,Header,Content,Footer} = Layout;
class index extends Component {
    render (){
        return (
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        )
    }
}
export default index;