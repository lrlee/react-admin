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
        //分类列表
        sortList:[],
        //恢复弹框显隐
        restoreVisivle:false,
        //删除弹框显隐
        deleteVisible:false,
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
                            <span className="clear_btn" onClick={()=>this.restoreGoods()}>恢复</span>
                            <span className="delete_btn" onClick={()=>this.deleteGoods()}>删除</span>
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
    //删除分类
    deleteGoods(){
        this.setState({deleteVisible:true})
    }
    //确定删除
    confirmDelete(){

    }
    //恢复分类
    restoreGoods(){
        this.setState({restoreVisivle:true})
    }
    //确定恢复
    confirmRestore(){

    }
    render() {
        const {columns,dataSource,restoreVisivle,deleteVisible,sortList}=this.state
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
                            getFieldDecorator("goodsName")(
                                <Input style={{ width: '120px', margin: '0 20px 0 20px' }} placeholder="商品名" />
                            )
                        }

                        <Button type="primary" className="btn btn-large btn-block btn-default">搜索</Button>
                    </div>
                    <div className="right_box">
                        <Button type="primary" style={{ marginRight: '10px' }} className="btn btn-large btn-block btn-default">批量恢复</Button>
                        <Button type="danger" className="btn btn-large btn-block btn-default">批量删除</Button>
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
                    确定恢复该商品吗？
                </Modal>
                <Modal
                    visible={deleteVisible}
                    title='删除商品'
                    onCancel={()=>this.setState({deleteVisible:false})}
                    onOk={this.confirmDelete()}
                >
                    <p style={{fontSize:'20px',textAlign:'center'}}>确定删除该商品吗？</p>
                    <p style={{fontSize:'14px',textAlign:'center'}}>删除后将不可恢复</p>
                </Modal>
            </GooodListStyle>
        )
    }
}
const mapStateToProps = state =>({
    userInfo:state.user
})
export default connect(mapStateToProps)(Form.create()(RecycleList));

