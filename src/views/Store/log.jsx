import React,{Component} from 'react';
import styled from 'styled-components';
import {Table, message} from 'antd'
import {connect} from 'react-redux'
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
        logList:[],
        columns:[
            {
                title:'IP',
                dataIndex:'login_ip'
            },
            {
                title:'登录时间',
                dataIndex:'login_time'
            }
        ]
    }
    componentDidMount(){
        this.getLogList()
    }
    //获取登录日志
    getLogList(){
        ajax({
            url:'/userController/loginLogs.do',
            method:'get',
            params:{
                account:this.props.userInfo.account
            }
        }).then(res=>{
            if(res.data.result){
                this.setState({
                    logList:res.data.data
                })
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })
    }
    render(){
        const {logList,columns} = this.state
        return(
            <LoginLogStyled>
                <div className="loginLog_box">
                    <p className="title">只保留显示最近30天的登录日志</p>
                    <Table dataSource={logList} columns={columns}/>
                </div>
            </LoginLogStyled>
        )
    }
}
const mapStateToProps = state=>({
    userInfo:state.user
})
export default connect(mapStateToProps)(LoginLog)