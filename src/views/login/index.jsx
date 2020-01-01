import React,{Component} from 'react';
import styled from 'styled-components';
import {Form} from 'antd'
const LoginStyle = styled.div`
    width:100%;
    height:100%;
`;

class Login extends Component {
    render(){
        return(
            <LoginStyle>
                <div className="test">
                    登录页面
                </div>
            </LoginStyle>
            
        )
    }
}
export default Form.create()(Login)