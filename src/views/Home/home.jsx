import React,{Component} from 'react';
import styled from 'styled-components';
import {Layout} from 'antd';
import NavBar from '@/views/NavBar';
import Routes from '@/router';
const {Sider,Header,Content,Footer} = Layout;
class HomePage extends Component {
    render(){
       return (
        <Layout>
            <Sider
                breakpoint ='xs'
                style={{
                    overflow:'auto',
                    height:'100vh',
                    position:'fixed',
                    left:'0',
                    background:'#fff'
                }}
            >
            <NavBar/>
            </Sider>
            <Layout 
                style={{marginLeft:'200px',minHeight:'100vh'}}>
                <Header style={{background:'rgb(240, 242, 245)'}}>
                    header
                </Header>
                <Content style={{padding:'20px'}}>
                    <Routes />
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
       )
    }
}

export default HomePage