import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { Form, Input, Select, Button, Table, message ,DatePicker } from 'antd';
import ajax from '@/utils/ajax'
const { Option } = Select;
const {RangePicker } = DatePicker 
const RevenueAnalysisStyle = styled.div`
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
    .statisticsInfo{
        padding:0 0 20px 20px;
        >span{
            padding:10px 15px;
            background:#f0f0f0;
            border-radius:8px;
            margin-right:10px;
        }
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
class RevenueAnalysis extends Component {
    state = {
        //商品列表
        goodsList:[],
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
        dataSource: [
            {
                id: 1,
                goodsName:'23244242(1张)',
                status: 0,
                pay_time: '2019-12-28',
                sale:1,
                orderNum:'T191229105910707450',
                payway:"微信支付",
                amount:'20.00',
                realPay:'18.00',
                buyerInfo:"1822526252",
                isTake:1,
                cardPassword:12456
            },
            {
                id: 1,
                goodsName:'23244242(1张)',
                status: 0,
                pay_time: '2019-12-28',
                sale:1,
                orderNum:'T191229105910707450',
                payway:"微信支付",
                amount:'20.00',
                realPay:'18.00',
                buyerInfo:"1822526252",
                isTake:1,
                cardPassword:12456
            },
            {
                id: 1,
                goodsName:'23244242(2张)',
                status: 0,
                pay_time: '2019-12-28',
                sale:1,
                orderNum:'T191229105910707450',
                payway:"微信支付",
                amount:'20.00',
                realPay:'18.00',
                buyerInfo:"1822526252",
                isTake:1,
                cardPassword:12456
            },
        ]
    }
    componentDidMount(){
        this.getGoodsList()
    }
    //获取商品列表
    getGoodsList(){
        ajax({
            url:'/goodsController/getGoods.do',
            params:{
                bussinessId:this.props.userInfo.businessId
            }
        }).then(res=>{
            if(res.data.result){
                this.setState({goodsList:res.data.data})
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
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
        const {columns,dataSource,goodsList}=this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <RevenueAnalysisStyle>
                <div className="top_action_box">
                    <div className="left_box">
                        {
                            getFieldDecorator("goods_id",{
                                initialValue:'0'
                            })(
                                <Select style={{ width: '120px',marginRight:'20px'}}>
                                    <Option value="0">全部商品</Option>
                                    {
                                        goodsList.map(v=>{
                                            return <Option value={v.id}>{v.category_name}</Option>
                                        })
                                    }
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
                <div className="statisticsInfo">
                    <span className="amount">总收入：0</span>
                    <span className="amount">总成本：0</span>
                    <span className="amount">总利润：0</span>
                </div>
                <div className="table_list_box">
                    <Table  columns={columns} dataSource={dataSource} />
                </div>
            </RevenueAnalysisStyle>
        )
    }
}
const mapStateToProps=state=>({
    userInfo:state.user
})
export default connect(mapStateToProps)(Form.create()(RevenueAnalysis));

