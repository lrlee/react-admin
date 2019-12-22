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
                        style={{marginLeft:'200px',height:'100vh'}}
    h               >
                        <Header>Header</Header>
                        <Content>
                            <Routes />
                        </Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            </BrowserRouter>
        )
    }
}
export default index;