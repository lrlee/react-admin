import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import ajax from '@/utils/ajax'
import { Form, Input, Select, Button, Table, Switch ,DatePicker } from 'antd';
const { Option } = Select;
const {RangePicker } = DatePicker 
const OrderListStyle = styled.div`
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
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};
class OrderList extends Component {
    state = {
        columns: [
            {
                title: '订单号',
                dataIndex: 'orderNum',
                render:(text,record)=>{
                    return <a>{record.orderNum}</a>
                }
            },
            {
                title: '商品名称',
                dataIndex: 'goodsName'
            },
            {
                title:'支付方式',
                dataIndex:'payway'
            },
            {
                title:'总价',
                dataIndex:'amount'
            },
            {
                title:'实付款',
                dataIndex:'realPay'
            },
            {
                title:'购买者信息',
                dataIndex:'buyerInfo'
            },
            {
                title:'状态',
                dataIndex:'status',
                render:(text,record)=>{
                    if(record.status){
                        return '已付款'
                    }else{
                        return '未付款'
                    }
                }
            },
            {
                title: '取卡状态',
                dataIndex: 'isTake',
                render:(text,record)=>{
                    if(record.status){
                        return '已取卡'
                    }else{
                        return '未取卡'
                    }
                }
            },
            {
                title: '取卡密码',
                dataIndex: 'cardPassword'
            },
            {
                title:'交易时间',
                dataIndex:'pay_time'
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => {
                    return (
                        <div className="action_box">
                            {/* <Link to='/store/link'>链接</Link>
                            <Link to='/goods/add'>加卡</Link>
                            <Link to='/store/link'>编辑</Link>
                            <span className="export_btn" onClick={()=>this.deleteSort()}>删除</span>
                            <span className="clear_btn" onClick={()=>this.clearSort()}>清空</span> */}
                        </div>
                    )
                }
            }
        ],
        dataSource: []
    }
    componentDidMount(){
        this.getOrderList()
    }
    //获取订单列表
    getOrderList(){
        ajax({
            url:'/orderController/getOrderList.do',
            params:{
                bussinessId:this.props.userInfo.businessId
            }
        }).then(res=>{
            if(res.data.result){
                this.setState({dataSource:res.data.data})             
            }
        })
    }
    //导出报表
    exportExcel(){
        console.log('导出报表')
    }
    //清空分类
    clearSort(){
        console.log("清空分类")
    }
    //删除分类
    deleteSort(){
        console.log('删除分类')
    }
    onChange(){

    }
    onOk(){

    }
    render() {
        const {columns,dataSource}=this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <OrderListStyle>
                <div className="top_action_box">
                    <div className="left_box">
                        {
                            getFieldDecorator("sortName",{
                                initialValue:'0'
                            })(
                                <Select style={{ width: '120px',marginRight:'10px'}}>
                                    <Option value="0">全部分类</Option>
                                    <Option value="1">分类1</Option>
                                    <Option value="2">分类2</Option>
                                </Select>
                            )
                        }
                        {
                            getFieldDecorator("status",{
                                initialValue:'0'
                            })(
                                <Select style={{ width: '120px',marginRight:'10px' }}>
                                    <Option value="0">全部</Option>
                                    <Option value="1">已付款</Option>
                                    <Option value="2">未付款</Option>
                                </Select>
                            )
                        }
                        {
                            getFieldDecorator("status",{
                                initialValue:'0'
                            })(
                                <Select style={{ width: '120px'}}>
                                    <Option value="0">订单编号</Option>
                                    <Option value="1">商品名称</Option>
                                    <Option value="2">联系方式</Option>
                                </Select>
                            )
                        }
                        {
                            getFieldDecorator("goodsName")(
                                <Input style={{ width: '120px', margin: '0 10px' }} placeholder="请输入关键字" />
                            )
                        }
                        <RangePicker
                            showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                            placeholder={['Start Time', 'End Time']}
                            onChange={()=>this.onChange()}
                            onOk={()=>this.onOk()}
                        />
                        <Button type="primary" style={{marginLeft:'10px'}} className="btn btn-large btn-block btn-default">搜索</Button>
                    </div>
                </div>
                <div className="table_list_box">
                    <Table  columns={columns} dataSource={dataSource} />
                </div>
            </OrderListStyle>
        )
    }
}
const mapStateToProps = state =>({
    userInfo:state.user
})
export default connect(mapStateToProps)(Form.create()(OrderList));

