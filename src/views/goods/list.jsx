import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { Form, Input, Select, Button, Table, Switch, Modal, message } from 'antd';
import ajax from '@/utils/ajax'
const { Option } = Select;
const GooodListStyle = styled.div`
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
class GoodsList extends Component {
    state = {
        //分类列表
        sortList:[],
        //删除商品id
        deleteGoodsId:null,
        //删除分类弹框显隐
        deletSortVisible:false,
        //清空分类弹框显隐
        clearSortVisible:false,
        columns: [
            {
                title: '商品分类',
                dataIndex: 'category_name',
                key:1
            },
            {
                title: '排序(值越大越排前)',
                dataIndex: 'sort',
                key:2
            },
            {
                title:'商品名称',
                dataIndex:'goods_name',
                key:3
            },
            {
                title:'代理授权码',
                dataIndex:'code',
                key:4
            },
            {
                title:'价格',
                dataIndex:'goods_price',
                key:5
            },
            {
                title:'代理价格',
                dataIndex:'goods_cost_price',
                key:6
            },
            {
                title:'库存(张)',
                dataIndex:'inventory',
                key:7
            },
            {
                title:'卖出(张)',
                dataIndex:'sale',
                key:8
            },
            {
                title:'上下架',
                dataIndex:'status',
                key:9,
                render:(text,record)=>{
                    if (record.status) {
                        return <Switch defaultChecked onChange={this.handleChange} />
                    } else {
                        return <Switch  onChange={this.handleChange} />
                    }
                }
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key:10
            },
            {
                title: '操作',
                dataIndex: 'action',
                key:11,
                render: (text, record) => {
                    return (
                        <div className="action_box">
                            <Link to={{
                                pathname:'/store/link',
                                state:{
                                    title:'店铺链接'
                                }
                            }}>链接</Link>
                            <Link to={{
                                pathname:'/card/add',
                                state:{
                                    title:'添加虚拟卡'
                                }
                            }}>加卡</Link>
                            <Link to={{
                                pathname:'/goods/add',
                                state:{
                                    title:'编辑商品'
                                }
                            }}>编辑</Link>
                            <span className="export_btn" onClick={()=>this.deleteGoods(record)}>删除</span>
                            <span className="export_btn" onClick={()=>this.clearCard(record)}>清空虚拟卡</span>
                        </div>
                    )
                }
            }
        ],
        dataSource: []
    }
    componentDidMount(){
        this.getGoodsList()
        this.getSortList()
    }
    handleChange(data,flag){
        console.log(data,flag,"flag")
    }
    //获取分类列表
    getSortList(){
        ajax({
            url:'/categoryController/getCategory.do',
            params:{
                bussinessId:this.props.userInfo.businessId
            }
        }).then(res=>{
            if(res.data.result){
                this.setState({sortList:res.data.data})
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })
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
                this.setState({dataSource:res.data.data})
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
    //清空虚拟卡
    clearCard(){
        this.setState({clearSortVisible:true})
    }
    //删除商品
    deleteGoods(data){
        this.setState({deletSortVisible:true,deleteGoodsId:data.id})
    }
    //确定删除商品
    comDeleteGoods(){
        const {deleteGoodsId} =this.state
        ajax({
            url:"/goodsController/delGoods.do",
            method:'post',
            data:{
                goods_id:deleteGoodsId
            }
        }).then(res=>{
            if(res.data.result){
                message.success(res.data.msg)
                this.setState({
                    deletSortVisible:false,
                    deleteGoodsId:null
                })
                this.getGoodsList()
            }
        })
    }
    toAddGoods(){
        this.props.history.push({
            pathname:'/goods/add'
        })
    }
    render() {
        const {columns,dataSource,deletSortVisible,clearSortVisible,sortList}=this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <GooodListStyle>
                <div className="top_action_box">
                    <div className="left_box">
                        {
                            getFieldDecorator("category_id",{
                                initialValue:'0'
                            })(
                                <Select style={{ width: '120px',marginRight:'20px'}}>
                                    <Option value="0">全部分类</Option>
                                    {
                                        sortList.map(v=>{
                                            return <Option value={v.id}>{v.category_name}</Option>
                                        })
                                    }
                                </Select>
                            )
                        }
                        {
                            getFieldDecorator("status",{
                                initialValue:'0'
                            })(
                                <Select style={{ width: '120px' }}>
                                    <Option value="0">全部</Option>
                                    <Option value="1">已售出</Option>
                                    <Option value="2">未售出</Option>
                                </Select>
                            )
                        }
                        {
                            getFieldDecorator("goodsName")(
                                <Input style={{ width: '120px', margin: '0 20px 0 20px' }} placeholder="商品名" />
                            )
                        }

                        <Button type="primary" className="btn btn-large btn-block btn-default">搜索</Button>
                    </div>
                    <div className="right_box">
                        <Button type="primary" style={{ marginRight: '10px' }} className="btn btn-large btn-block btn-default" onClick={()=>this.exportExcel()}>导出</Button>
                        <Button type="primary" style={{ marginRight: '10px' }} className="btn btn-large btn-block btn-default">批量删除</Button>
                        <Button type="danger" className="btn btn-large btn-block btn-default" onClick={()=>this.toAddGoods()}>添加商品</Button>
                    </div>
                </div>
                <div className="table_list_box">
                    <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
                </div>
                <Modal 
                    visible={deletSortVisible}
                    title='删除分类'
                    onCancel={()=>this.setState({deletSortVisible:false})}
                    onOk={()=>this.comDeleteGoods()}
                >
                    <p className="tips" style={{fontSize:'20px',textAlign:'center'}}>确定删除该商品吗？</p>
                    <p style={{fontSize:'14px',textAlign:'center'}}>删除的商品将进入回收站</p>
                </Modal>
                <Modal
                    visible={clearSortVisible}
                    title='清空虚拟卡'
                    onCancel={()=>this.setState({clearSortVisible:false})}
                    onOk={()=>this.clearCard()}
                >
                    <p style={{fontSize:'20px',textAlign:'center',color:'#000'}}>确定清空该商品所有未售虚拟卡吗？</p>
                    <p style={{fontSize:'14px',textAlign:'center'}}>删除的虚拟卡将进入回收站</p>
                </Modal>
            </GooodListStyle>
        )
    }
}
const mapStateToProps=state=>({
    userInfo:state.user
})
export default connect(mapStateToProps)(Form.create()(GoodsList));

