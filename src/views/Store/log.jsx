import React,{Component} from 'react';
import styled from 'styled-components';
import TableList from '@/components/table'

const LoginLogStyled = styled.div`
    padding:30px 10px 10px;
    background:#fff;
    .loginLog_box{
        .title{
            padding:15px;
            margin-left:10px;
            background-color: rgba(52, 211, 235, 0.2);
            padding-left:35px;
            border:1px solid rgba(52, 211, 235, 0.3);
            border-radius:4px;
            color:#35b8e0;
        }
    }
`;
class LoginLog extends Component {
    render(){
        return(
            <LoginLogStyled>
                <div className="loginLog_box">
                    <p className="title">只保留显示最近30天的登录日志</p>
                    <TableList />
                </div>
            </LoginLogStyled>
        )
    }
}
export default LoginLog