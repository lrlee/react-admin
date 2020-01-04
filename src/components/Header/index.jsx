import React,{Component} from 'react';
import {withRouter} from 'react-router-dom'
import styled from 'styled-components';
import {Icon} from 'antd'
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
    render(){
        return (
            <HeaderStyle>
                <div className="header_container">
                    <p className="left_text">{this.props.location.state.title}</p>
                    <div className="right_container">
                        <div className="id_box">
                            ID: <span className="user_id">17361</span>
                        </div>
                        <div className="withdraw_box">
                            $今日可提现: <span className="withdraw_amount">0.00</span><span className="withdraw_btn">提现</span>
                        </div>
                        <div className="balance_box">
                            $未结余额: <span className="balance">0.00 </span>
                        </div>
                        <div className="merchant_group">
                            商户群<span className="group">226044934</span>
                        </div>
                        <div className="reset">
                            <span><Icon type="setting"/>设置</span>
                        </div>
                        <div className="logout">
                            <span><Icon type="poweroff"/>退出</span>
                        </div>
                    </div>
                </div>
            </HeaderStyle>
            
        )
    }
}

export default  withRouter(HeaderNav);