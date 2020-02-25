import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import ajax from '@/utils/ajax'
import { Form, Select, Button, Table, Modal, message } from 'antd';

const { Option } = Select;
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
class CardList extends Component {
    state = {
        //分类列表
        sortList:[],
        //商品列表
        goodsList:[],
        //删除的虚拟卡id
        deleteCardId:[],
        //删除虚拟卡弹框显隐
        deleteVisible:false,
        columns: [
            {
                title: '商品分类',
                dataIndex: 'category_name'
            },
            {
                title: '商品名称',
                dataIndex: 'goods_name'
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
                title:'状态',
                dataIndex:'status',
                render:(text,record)=>{
                    if(record.status && record.status!=="0"){
                        return <span className="status_text">已售出</span>
                    }else{
                        return <span className="status_text">未售出</span>
                    }
                }
            },
            {
                title: '创建时间',
                dataIndex: 'create_time'
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => {
                    return (
                        <div className="action_box">
                            <span className="export_btn" onClick={()=>this.deleteCard(record)}>删除</span>
                        </div>
                    )
                }
            }
        ],
        dataSource: []
    }
    componentDidMount(){
        this.getCardList()
        this.getSortList()
        this.getGoodsList()
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
                this.setState({goodsList:res.data.data})
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })
    }
    //获取虚拟卡列表
    getCardList(){
        ajax({
            url:'/virtualCardController/getVirtualCard.do',
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
            console.log(err,"err")
            message.error(err.data.msg)
        })
    }
    //删除虚拟卡
    deleteCard(data){
        this.setState({deleteVisible:true,deleteCardId:[data.id]})
    }
    //确定删除
    confirmDelete(){
        const {deleteCardId} = this.state
        ajax({
            url:'/virtualCardController/delVirtualCard.do',
            method:'post',
            data:deleteCardId
        }).then(res=>{
            if(res.data.result){
                this.setState({deleteVisible:false})
                this.getCardList()
                message.success(res.data.msg)
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })
    }
    getSelectData(selectedRowKeys,selectedRows){
        this.setState({deleteCardId:selectedRows.length?selectedRows.map(v=>v.id):[]})
    }
    //批量删除
    batchDeletion(){
        const {deleteCardId} = this.state
        if(!deleteCardId.length){
            message.warning("请选择需要删除的数据")
            return;
        }
        this.setState({deleteVisible:true,deleteCardId})
    }
    //搜索
    search(e){
        e.preventDefault()
        this.props.form.validateFields((err,values)=>{
            if(!err){
                values['bussinessId']=this.props.userInfo.businessId
                ajax({
                    url:`/virtualCardController/getVirtualCard.do?bussinessId=${values.bussinessId}&type=${values.type}`,
                }).then(res=>{
                    if(res.data.result){
                        console.log(res,"success")
                        this.setState({
                            dataSource:res.data.data ||[]
                        })
                    }else{
                        message.error(res.data.msg)
                    }
                }).catch(err=>{
                    message.error(err)
                })
            }else{
                message.error(err)
            }
        })
    }
    //导出虚拟卡
    exportCard(){
        const {deleteCardId} = this.state
        if(!deleteCardId.length){
            message.warning("请选择需要导出的数据")
            return;
        }
        fetch('http://122.51.163.202:8080/virtualCardController/exportVirtualCard.do', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':sessionStorage.getItem("token")
            },
            responseType: 'blob',
            body: JSON.stringify(deleteCardId),
        }).then(res => res.blob()).then(data => {
            let blobUrl = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.download = '卡密.xls';
            a.href = blobUrl;
            a.click();
        })
        // ajax({
        //     url:'/virtualCardController/exportVirtualCard.do',
        //     method:'post',
        //     data:deleteCardId
        // }).then(res=>{
        //     console.log(res,"ssdddd")
        // }).catch(err=>{
        //     message.error(err.data.msg)
        // })
    }
    toAddCard(){
        this.props.history.push({
            pathname:'/card/add'
        })
    }
    render() {
        const {columns,dataSource,deleteVisible,sortList,goodsList}=this.state
        const { getFieldDecorator } = this.props.form;
        const rowSelection = {
            onChange: (selectedRowKeys,selectedRows)=>this.getSelectData(selectedRowKeys,selectedRows),
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return (
            <CardListStyle>
                <div className="top_action_box">
                    <div className="left_box">
                    <Form layout='inline' onSubmit={(e)=>this.search(e)}>
                        {/* <Form.Item>
                            {
                                getFieldDecorator("category_name",{
                                    initialValue:''
                                })(
                                    <Select style={{ width: '120px',marginRight:'20px'}}>
                                        <Option value="">全部分类</Option>
                                        {
                                            sortList.map(v=>{
                                                return <Option value={v.category_name}>{v.category_name}</Option>
                                            })
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item> */}
                        {/* <Form.Item>
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
                        </Form.Item> */}
                        <Form.Item>
                            {
                                getFieldDecorator("type",{
                                    initialValue:''
                                })(
                                    <Select style={{ width: '120px',marginRight:'20px'}}>
                                        <Option value="">全部</Option>
                                        <Option value="sold">已售出</Option>
                                        <Option value="unsold">未售出</Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {/* <input className='addSortBtn' type="submit" value='添加分类'/> */}
                           <input type="submit" className="btn btn-large btn-block btn-default search-btn" value="搜索"/>
                        </Form.Item>
                    </Form> 
                    </div>
                    <div className="right_box">
                        <Button type="primary" style={{ marginRight: '10px' }} className="btn btn-large btn-block btn-default" onClick={()=>this.batchDeletion()}>批量删除</Button>
                        <Button type="danger" style={{ marginRight: '10px' }}  className="btn btn-large btn-block btn-default" onClick={()=>this.toAddCard()}>添加虚拟卡</Button>
                        <Button type="primary"  className="btn btn-large btn-block btn-default" onClick={()=>this.exportCard()}>导出卡密</Button>
                    </div>
                </div>
                <div className="table_list_box">
                    <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
                </div>
                <Modal
                    visible={deleteVisible}
                    title="删除虚拟卡"
                    onCancel={()=>this.setState({deleteVisible:false})}
                    onOk={()=>this.confirmDelete()}
                >
                    <p style={{fontSize:'20px',textAlign:'center',color:'#000'}}>确定删除该虚拟卡吗？</p>
                    <p style={{fontSize:'14px',textAlign:'center',color:'#000'}}>你可以在回收站恢复该操作</p>
                </Modal>
            </CardListStyle>
        )
    }
}
const mapStateToProps = state=>({
    userInfo:state.user
})
export default connect(mapStateToProps)(Form.create()(CardList));

