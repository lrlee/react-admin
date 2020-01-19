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
class RecycleList extends Component {
    state = {
        //分类数据
        sortList:[],
        selectCardIds:[],
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
    //获取回收站列表
    getRecycleList(){
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
            message.error(err.data.msg)
        })
    }
    //删除分类
    deleteCard(data){
        const {selectCardIds} = this.state
        if(data){
            this.setState({deleteVisible:true,selectCardIds:[data.id]})
        }else{
            if(!selectCardIds.length){
                message.info("请选择要删除的虚拟卡")
                return false;
            }
            this.setState({
                deleteVisible:true
            })
        }
        
    }
    //恢复分类
    restoreCard(data){
        const {selectCardIds} = this.state
        if(data){
            this.setState({restoreVisible:true,selectCardIds:[data.id]})
        }else{
            if(!selectCardIds.length){
                message.info("请徐泽要恢复的虚拟卡")
                return false;
            }
            this.setState({restoreVisible:true})
        }
        
    }
    confirmDelete(){
        const {selectCardIds} = this.state
        ajax({
            url:"/virtualCardController/removeVirtualCard.do",
            method:'post',
            data:{
                virtual_card_id:selectCardIds
            }
        }).then(res=>{
            if(res.data.result){
                message.success(res.data.msg)
                this.setState({
                    deleteVisible:false,
                    selectCardIds:[]
                })
                this.getRecycleList()
            }
        }).catch(err=>{
            message.error('删除接口出错')
        })
    }
    confirmRestore(){
        const {selectCardIds} = this.state
        ajax({
            url:'/virtualCardController/recoveryVirtualCard.do',
            method:'post',
            data:{
                virtual_card_id:selectCardIds
            }
        }).then(res=>{
            if(res.data.result){
                message.success(res.data.msg)
                this.setState({restoreVisible:false,selectCardIds:[]})
                this.getRecycleList()
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error('恢复接口报错')
        })
    }
    selectChange=(selectedRowKeys,selectedRows)=>{
        this.setState({selectCardIds:selectedRows.map(v=>v.id)})
    }
    render() {
        const {columns,dataSource,deleteVisible,restoreVisible,clearRecycleVisible,sortList}=this.state
        const { getFieldDecorator } = this.props.form;
        const rowSelection = {
            onChange:this.selectChange
        }
        return (
            <GooodListStyle>
                <div className="top_action_box">
                    <div className="left_box">
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
                        {
                            getFieldDecorator("goodsName")(
                                <Input style={{ width: '120px', margin: '0 20px 0 20px' }} placeholder="商品名" />
                            )
                        }

                        <Button type="primary" className="btn btn-large btn-block btn-default">搜索</Button>
                    </div>
                    <div className="right_box">
                        <Button type="primary" onClick={()=>this.restoreCard()} style={{ marginRight: '10px' }} className="btn btn-large btn-block btn-default">批量恢复</Button>
                        <Button type="danger"  onClick={()=>this.deleteCard()} style={{ marginRight: '10px' }} className="btn btn-large btn-block btn-default">批量删除</Button>
                        <Button type="danger"  onClick={()=>this.clearRecycle()} className="btn btn-large btn-block btn-default">清空回收站</Button>
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

