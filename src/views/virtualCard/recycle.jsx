import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { Form, Input, Select, Button, Table, Switch, Modal, message } from 'antd';
import {connect} from 'react-redux'
import ajax from '@/utils/ajax'
const { Option } = Select;
const { TextArea } = Input;
const GooodListStyle = styled.div`
    padding:20px 0;
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
class RecycleList extends Component {
    state = {
        //分类数据
        sortList:[],
        goodsList:[],
        //恢复虚拟卡id
        restoreCardId:[],
        deleteCardId:[],
        //删除虚拟卡
        deleteVisible:false,
        restoreVisible:false,
        //清空回收站
        clearRecycleVisible:false,
        columns: [
            {
                title: '商品分类',
                dataIndex: 'category_name'
            },
            {
                title:'商品名称',
                dataIndex:'goods_name'
            },
            {
                title:'商品价格',
                dataIndex:'goods_price'
            },
            {
                title:'卡号',
                dataIndex:'virtual_card_num'
            },
            {
                title:'卡密',
                dataIndex:'virtual_card_password'
            },
            {
                title: '删除时间',
                dataIndex: 'del_time'
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => {
                    return (
                        <div className="action_box">
                            <span className="clear_btn" onClick={()=>this.restoreCard(record)}>恢复</span>
                            <span className="delete_btn" onClick={()=>this.deleteCard(record)}>删除</span>
                        </div>
                    )
                }
            }
        ],
        dataSource: []
    }
    componentDidMount(){
        this.getRecycleList()
        this.getSortList()
        this.getGoodsList()
    }
    //获取分类数据
    getSortList(){
        ajax({
            url:'/categoryController/getCategory.do',
            params:{
                bussinessId:this.props.userInfo.businessId
            }
        }).then(res=>{
            if(res.data.result){
                this.setState({
                    sortList:res.data.data
                })
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
                this.setState({goodsList:res.data.data})
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })
    }
    //获取回收站列表
    getRecycleList(){
        ajax({
            url:'/virtualCardController/getVirtualCard.do',
            params:{
                bussinessId:this.props.userInfo.businessId,
                type:'del'
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
    //删除虚拟卡
    deleteCard(record){
        this.setState({deleteVisible:true,restoreCardId:[record.id]})
    }
    //恢复虚拟卡
    restoreCard(data){
        this.setState({restoreVisible:true,restoreCardId:[data.id]})
    }
    confirmDelete(){
        const {restoreCardId} = this.state
        ajax({
            url:"/virtualCardController/removeVirtualCard.do",
            method:'post',
            data:restoreCardId
        }).then(res=>{
            if(res.data.result){
                message.success(res.data.msg)
                this.setState({
                    deleteVisible:false,
                    deleteCardId:null
                })
                this.getRecycleList()
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })
    }
    confirmRestore(){
        const {restoreCardId} = this.state
        ajax({
            url:'/virtualCardController/recoveryVirtualCard.do',
            method:'post',
            data:restoreCardId
        }).then(res=>{
            if(res.data.result){
                message.success(res.data.msg)
                this.setState({restoreVisible:false})
                this.getRecycleList()
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })
    }
    //获取选择的商品
    getSelectData(selectedRowKeys,selectedRows){
        this.setState({restoreCardId:selectedRows.length?selectedRows.map(v=>v.id):[]})
    }
    //批量恢复
    bulkRecovery(){
        const {restoreCardId} = this.state
        if(!restoreCardId.length){
            message.warning("请选择需要恢复的数据")
            return;
        }
        this.setState({restoreVisible:true,restoreCardId:restoreCardId})
    }
    //批量删除
    batchDeletion(){
        const {restoreCardId} = this.state
        if(!restoreCardId.length){
            message.warning("请选择需要删除的数据")
            return;
        }
        this.setState({deleteVisible:true})
    }
    //清空回收站
    emptyRecycle(){
        const {dataSource} = this.state
        if(!dataSource.length){
            message.info("回收站已为空")
            return;
        }
        this.setState({clearRecycleVisible:true})
    }
    //确定清空回收站
    clearRecycle(){
        ajax({
            url:'virtualCardController/clearDelVirtualCard.do',
            method:'post',
            data:{
                bussinessId:this.props.userInfo.businessId
            }
        }).then(res=>{
            if(res.data.result){
                message.success("清除成功")
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })
    }
    render() {
        const {columns,dataSource,deleteVisible,restoreVisible,clearRecycleVisible,sortList,goodsList}=this.state
        const { getFieldDecorator } = this.props.form;
        const rowSelection = {
            onChange: (selectedRowKeys,selectedRows)=>this.getSelectData(selectedRowKeys,selectedRows),
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return (
            <GooodListStyle>
                <div className="top_action_box">
                    <div className="left_box">
                         <Form layout='inline' onSubmit={(e)=>this.search(e)}>
                        <Form.Item>
                            {
                            sortList.length && (
                                getFieldDecorator("sortName",{
                                    initialValue:'0'
                                })(
                                    <Select style={{ width: '120px'}}>
                                        <Option  value="0">全部分类</Option>
                                        {
                                            sortList.map(v=><Option key={v.id} value={v.id}>{v.category_name}</Option>)
                                        }
                                    </Select>
                                )
                            )
                        }
                        </Form.Item>
                        <Form.Item>
                            {
                            getFieldDecorator("goods_id",{
                                initialValue:'0'
                            })(
                                <Select style={{ width: '120px',marginLeft:'20px'}}>
                                    <Option value="0">全部商品</Option>
                                    {
                                        goodsList.map(v=>{
                                            return <Option value={v.id}>{v.category_name}</Option>
                                        })
                                    }
                                </Select>
                            )
                        }
                        </Form.Item>
                        <Form.Item>
                           {
                                getFieldDecorator("param")(
                                    <Input style={{ width: '120px', margin: '0 20px 0 20px' }} placeholder="商品名" />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                           <input type="submit" className="btn btn-large btn-block btn-default search-btn" value="搜索"/>
                        </Form.Item>
                    </Form> 
                    </div>
                    <div className="right_box">
                        <Button type="primary" style={{ marginRight: '10px' }} className="btn btn-large btn-block btn-default" onClick={()=>this.bulkRecovery()}>批量恢复</Button>
                        <Button type="danger"  style={{ marginRight: '10px' }} className="btn btn-large btn-block btn-default" onClick={()=>this.batchDeletion()}>批量删除</Button>
                        <Button type="danger" onClick={()=>this.emptyRecycle()} className="btn btn-large btn-block btn-default">清空回收站</Button>
                    </div>
                </div>
                <div className="table_list_box">
                    <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
                </div>
                <Modal
                    visible={deleteVisible}
                    title="删除虚拟卡"
                    onCancel={()=>this.setState({deleteVisible:false})}
                    onOk={()=>{this.confirmDelete()}}
                >
                    <p style={{fontSize:'20px',textAlign:'center',color:"#000"}}>确定删除该虚拟卡吗？</p>
                    <p style={{fontSize:'14px',textAlign:'center'}}>删除后将无法恢复</p>
                </Modal>
                <Modal
                    visible={restoreVisible}
                    title='恢复虚拟卡'
                    onCancel={()=>this.setState({restoreVisible:false})}
                    onOk={()=>this.confirmRestore()}
                >
                    <p style={{fontSize:'20px',textAlign:'center',color:'#000'}}>确定恢复该虚拟卡吗？</p>
                </Modal>
                <Modal
                    visible={clearRecycleVisible}
                    title='清空回收站'
                    onCancel={()=>this.setState({clearRecycleVisible:false})}
                    onOk={()=>this.clearRecycle()}
                >
                    <p style={{fontSize:'20px',textAlign:'center',color:'#000'}}>确定清空回收站吗？</p>
                    <p style={{fontSize:'14px',textAlign:'center'}}>清空后无法恢复</p>
                </Modal>
            </GooodListStyle>
        )
    }
}

const mapStateToProps = state =>({
    userInfo:state.user
})
export default connect(mapStateToProps)(Form.create()(RecycleList));

