import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import ajax from '@/utils/ajax'
import { Form, Input, Select, Button, Table, Modal, message } from 'antd';

const { Option } = Select;
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
        //分类列表
        sortList:[],
        //恢复弹框显隐
        restoreVisivle:false,
        //删除弹框显隐
        deleteVisible:false,
        selectGoodsIds:[],
        columns: [
            {
                title: '商品分类',
                dataIndex: 'category_name'
            },
            {
                title: '排序(值越大越排前)',
                dataIndex: 'sort'
            },
            {
                title:'商品名称',
                dataIndex:'goods_name'
            },
            {
                title:'价格',
                dataIndex:'goods_price'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time'
            },
            {
                title: '删除时间',
                dataIndex: 'delete_time'
            },
            {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => {
                    return (
                        <div className="action_box">
                            <span className="clear_btn" onClick={()=>this.restoreGoods(record)}>恢复</span>
                            {/* <span className="delete_btn" onClick={()=>this.deleteGoods(record)}>删除</span> */}
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
    //获取回收站列表
    getRecycleList(){
        ajax({
            url:'/goodsController/getDelGoods.do',
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
    //恢复商品
    restoreGoods(data){
        this.setState({restoreVisivle:true,selectGoodsIds:[data.id]})
    }
    //确定恢复
    confirmRestore(){
        const {selectGoodsIds} = this.state
        ajax({
            url:'/goodsController/recoveryDelGoods.do',
            method:'post',
            data:selectGoodsIds
        }).then(res=>{
            if(res.data.result){
                message.success(res.data.msg)
                this.setState({restoreVisivle:false})
                this.getRecycleList()
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })

    }
    //搜索
    search(e){
        e.preventDefault()
        this.props.form.validateFields((err,values)=>{
            if(!err){
                console.log(values,"values")
                values['bussinessId']=this.props.userInfo.businessId
                ajax({
                    url:`/virtualCardController/getVirtualCard.do?bussinessId=${values.bussinessId}&param=${values.param}&category_name=${values.category_name}`,
                }).then(res=>{
                    if(res.data.result){
                        console.log(res,"success")
                        this.setState({
                            dataSource:res.data.data || []
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
    //获取选择的商品
    getSelectData(selectedRowKeys,selectedRows){
        this.setState({selectGoodsIds:selectedRows.length?selectedRows.map(v=>v.id):[]})
    }
    //批量恢复
    bulkRecovery(){
        const {selectGoodsIds} = this.state
        if(!selectGoodsIds.length){
            message.warning("请选择需要恢复的数据")
            return;
        }
        this.setState({restoreVisivle:true,selectGoodsIds})
    }
    render() {
        const {columns,dataSource,restoreVisivle,deleteVisible,sortList}=this.state
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
                            getFieldDecorator("category_name",{
                                initialValue:'全部分类'
                            })(
                                <Select style={{ width: '120px'}}>
                                    <Option value="全部分类">全部分类</Option>
                                    {
                                        sortList.map(v=>{
                                            return <Option value={v.category_name}>{v.category_name}</Option>
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
                        {/* <Button type="danger" className="btn btn-large btn-block btn-default">批量删除</Button> */}
                    </div>
                </div>
                <div className="table_list_box">
                    <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
                </div>
                <Modal
                    visible={restoreVisivle}
                    title='恢复商品'
                    onCancel={()=>this.setState({restoreVisivle:false})}
                    onOk={()=>this.confirmRestore()}
                >
                    确定恢复商品吗？
                </Modal>
            </GooodListStyle>
        )
    }
}
const mapStateToProps = state =>({
    userInfo:state.user
})
export default connect(mapStateToProps)(Form.create()(RecycleList));

