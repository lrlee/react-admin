import React,{Component} from 'react';
import {withRouter} from 'react-router-dom'
import styled from 'styled-components';
import {Icon,message} from 'antd'
import {connect} from 'react-redux'
import ajax from '@/utils/ajax'
const HeaderStyle = styled.div`
    .header_container{
        display:flex;
        justify-content:space-between;
        .left_text{
            font-size:18px;
        }
        .right_container{
            display:flex;
            >div{
                margin-right:20px;
                &.reset,&.logout{
                    cursor:pointer;
                }
                >span{
                    color: #337ab7;
                    margin-left:5px;
                    >i{
                        margin-right:3px;
                    }
                    &.withdraw_btn{
                        cursor:pointer;
                        margin-left:5px;
                    }
                }
            }
        }
    }
`;
class HeaderNav extends Component {
    logout(){
        ajax({
            url:'/userController/logout.do'
        }).then(res=>{
            if(res.data.result){
                this.props.history.push({
                    pathname:'/login'
                })
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            console.log(err,"logout")
        })
    }
    toSetting(){
        this.props.history.push({
            pathname:'/store/edit'
        })
    }
    render(){
        const {qq_group,tamount,wamount} = this.props.navInfo
        return (
            <HeaderStyle>
                <div className="header_container">
                    <p className="left_text">{this.props.location.state && this.props.location.state.title || ""}</p>
                    <div className="right_container">
                        <div className="id_box">
                            ID: <span className="user_id">17361</span>
                        </div>
                        <div className="withdraw_box">
                            $今日可提现: <span className="withdraw_amount">{tamount}</span><span className="withdraw_btn">提现</span>
                        </div>
                        <div className="balance_box">
                            $未结余额: <span className="balance">{wamount} </span>
                        </div>
                        <div className="merchant_group">
                            商户群<span className="group">{qq_group}</span>
                        </div>
                        <div className="reset" onClick={()=>this.toSetting()}>
                            <span><Icon type="setting"/>设置</span>
                        </div>
                        <div className="logout" onClick={()=>this.logout()}>
                            <span><Icon type="poweroff"/>退出</span>
                        </div>
                    </div>
                </div>
            </HeaderStyle>
            
        )
    }
}
const mapStateToProps = state=>({
    userInfo:state.user,
    navInfo:state.navInfo
})
export default connect(mapStateToProps,null)(withRouter(HeaderNav));