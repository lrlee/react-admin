import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import ajax from '@/utils/ajax'
import { Form, Input, Select, Button, Table, Switch, message } from 'antd';
const CardListStyle = styled.div`
    padding20px 0;
    background:#fff;
    .top_action_box{
        display:flex;
        justify-content:space-between;
        padding:20px;
    }
    .table_list_box{
        padding:0 10px;
    }
    .action_box{
        a{
            margin-right:10px;
        }
        >span{
            margin-right:10px;
            color:#1890ff;
            cursor:pointer;
        }
    }
`;
class WithdrawList extends Component {
    state = {
        columns: [
            {
                title: 'ID',
                dataIndex: 'id'
            },
            {
                title: '发起提现时间',
                dataIndex: 'apply_time'
            },
            {
                title:'提现金额',
                dataIndex:'amount'
            },
            {
                title:'手续费',
                dataIndex:'fee'
            },
            {
                title:'实际到账',
                dataIndex:'realAmount'
            },
            {
                title:'结算状态',
                dataIndex:'status',
                render:(text,record)=>{
                    if(record.status){
                        return <span className="status_text">已结算</span>
                    }else{
                        return <span className="status_text">未结算</span>
                    }
                }
            },
            {
                title: '结算时间',
                dataIndex: 'pay_time'
            }
        ],
        dataSource: []
    }
    componentDidMount(){
        this.getApplyList()
    }
    //获取提现列表
    getApplyList(){
        ajax({
            url:'/cashController/getCashList.do',
            params:{
                bussinessId:this.props.userInfo.businessId
            }
        }).then(res=>{
            if(res.data.result){
                this.setState({
                    dataSource:res.data.data
                })
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })
    }
    render() {
        const {columns,dataSource}=this.state
        return (
            <CardListStyle>
                <div className="top_action_box">
                    <div className="left_box">
                        <Button type="primary" onClick={()=>this.props.history.push('/withdraw/apply')} className="btn btn-large btn-block btn-default">申请提现</Button>
                    </div>
                </div>
                <div className="table_list_box">
                    <Table columns={columns} dataSource={dataSource} />
                </div>
            </CardListStyle>
        )
    }
}

const mapStateToProps = state=>({
    userInfo:state.user
})
export default connect(mapStateToProps)(Form.create()(WithdrawList))

