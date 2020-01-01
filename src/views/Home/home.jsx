import React,{Component} from 'react';
import styled from 'styled-components';

class HomePage extends Component {
    render(){
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
                style={{marginLeft:'200px',minHeight:'100vh'}}
    h               >
                <Header>Header</Header>
                <Content style={{padding:'20px'}}>
                    <Routes />
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    }
}