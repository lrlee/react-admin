import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { Form, Input, Select, Button, Table, Switch } from 'antd';

const { Option } = Select;
const { Column, ColumnGroup } = Table;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
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
        dataSource: [
            {
                id: 1,
                apply_time:'2019-12-29 14:2:44',
                amount: 25.00,
                status: 0,
                create_time: '2019-12-28',
                fee:8.00,
                realAmount:17.00,
                pay_time:"2019-12-3 17:58:02"
            },
            {
                id: 1,
                apply_time:'2019-12-29 14:2:44',
                amount: 25.00,
                status: 0,
                create_time: '2019-12-28',
                fee:8.00,
                realAmount:17.00,
                pay_time:"2019-12-3 17:58:02"
            },
            {
                id: 1,
                apply_time:'2019-12-29 14:2:44',
                amount: 25.00,
                status: 0,
                create_time: '2019-12-28',
                fee:8.00,
                realAmount:17.00,
                pay_time:"2019-12-3 17:58:02"
            },
        ]
    }
    render() {
        const {columns,dataSource}=this.state
        const { getFieldDecorator } = this.props.form;
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

export default Form.create()(WithdrawList);

