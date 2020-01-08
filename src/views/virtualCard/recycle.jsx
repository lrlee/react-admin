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
        //删除虚拟卡
        deleteVisible:false,
        restoreVisible:false,
        //清空回收站
        clearRecycleVisible:false,
        columns: [
            {
                title: '商品分类',
                dataIndex: 'name'
            },
            {
                title: '排序(值越大越排前)',
                dataIndex: 'sort'
            },
            {
                title:'商品名称',
                dataIndex:'goodsName'
            },
            {
                title:'价格',
                dataIndex:'price'
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
                            <span className="clear_btn" onClick={()=>this.restoreCard()}>恢复</span>
                            <span className="delete_btn" onClick={()=>this.deleteCard()}>删除</span>
                        </div>
                    )
                }
            }
        ],
        dataSource: []
    }
    componentDidMount(){
        this.getRecycleList()
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
    deleteCard(){
        this.setState({deleteVisible:true})
    }
    //恢复分类
    restoreCard(){
        this.setState({restoreVisible:true})
    }
    confirmDelete(){

    }
    confirmRestore(){

    }
    render() {
        const {columns,dataSource,deleteVisible,restoreVisible,clearRecycleVisible}=this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <GooodListStyle>
                <div className="top_action_box">
                    <div className="left_box">
                        {
                            getFieldDecorator("sortName",{
                                initialValue:'0'
                            })(
                                <Select style={{ width: '120px'}}>
                                    <Option value="0">全部分类</Option>
                                    <Option value="1">分类1</Option>
                                    <Option value="2">分类2</Option>
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
                        <Button type="danger"  style={{ marginRight: '10px' }} className="btn btn-large btn-block btn-default">批量删除</Button>
                        <Button type="danger" onClick={()=>this.clearRecycle()} className="btn btn-large btn-block btn-default">清空回收站</Button>
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

