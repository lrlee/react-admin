import React,{Component} from 'react';
import styled from 'styled-components';
import TableList from '@/components/table'
import ajax from '@/utils/ajax'
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
    state={
        //登录日志
        logList:[]
    }
    componentDidMount(){
        this.getLogList()
    }
    //获取登录日志
    getLogList(){
        ajax({
<<<<<<< HEAD
            url:'/userController/loginLogs.do?account=lee1991',
=======
            url:'/userController/loginLogs.do',
>>>>>>> 310310aa2c10b6b2288d339143e98341148abb98
            method:'get',
            params:{
                account:'lee1991'
            }
        }).then(res=>{
            this.setState({
                logList:res.data.data
            })
        })
    }
    render(){
        const {logList} = this.state
        console.log(logList)
        return(
            <LoginLogStyled>
                <div className="loginLog_box">
                    <p className="title">只保留显示最近30天的登录日志</p>
                    <TableList data={logList}/>
                </div>
            </LoginLogStyled>
        )
    }
}
export default LoginLog