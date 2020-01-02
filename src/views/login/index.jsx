import React,{Component} from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom'
import {Form} from 'antd'
import LoginForm from '@/views/Login/LoginForm'
import RegisterForm from '@/views/Login/RegisterForm'
import LoginBg from '@/assets/login_bg1.jpg'
import './style.css'
const LoginStyle = styled.div`
    position: fixed,
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url(${LoginBg}) no-repeat center;
    transition:all .5s;
`;

class Login extends Component {
    state = {
        showBox: 'login',   //展示当前表单
        url: '',  //背景图片
        loading:false,
    }
    //切换showbox
    switchShowBox = (box) => {
        console.log(box,"box")
        this.setState({
        showBox: box
        })
    }
    render(){
        const {showBox,loading} = this.state
        console.log(showBox,"show")
        return(
            <LoginStyle>
                <div id='login-page'>
                    {
                    loading ?
                        <div>
                        <h3  className='animated bounceInLeft'>载入中...</h3>
                        </div>:
                        <div>
                        <div id='backgroundBox'/>
                        <div className='container'>
                            <LoginForm
                            className={showBox === 'login' ? 'box showBox' : 'box hiddenBox'}
                            switchShowBox={this.switchShowBox}/>
                            <RegisterForm
                            className={showBox === 'register' ? 'box showBox' : 'box hiddenBox'}
                            switchShowBox={this.switchShowBox}/>
                        </div>
                        </div>
                    }
                </div>
            </LoginStyle>
            
        )
    }
}
export default withRouter(Form.create()(Login)) 