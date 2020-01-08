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
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};
class CardList extends Component {
    state = {
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
                    if(record.status){
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
                            <span className="export_btn" onClick={()=>this.deleteCard()}>删除</span>
                        </div>
                    )
                }
            }
        ],
        dataSource: []
    }
    componentDidMount(){
        this.getCardList()
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
            message.error(err.data.msg)
        })
    }
    //导出报表
    exportExcel(){
        console.log('导出报表')
    }
    //删除分类
    deleteCard(){
        this.setState({deleteVisible:true})
    }
    //确定删除
    confirmDelete(){

    }
    render() {
        const {columns,dataSource,deleteVisible}=this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <CardListStyle>
                <div className="top_action_box">
                    <div className="left_box">
                        {
                            getFieldDecorator("sortName",{
                                initialValue:'0'
                            })(
                                <Select style={{ width: '120px',marginRight:'20px'}}>
                                    <Option value="0">全部分类</Option>
                                    <Option value="1">分类1</Option>
                                    <Option value="2">分类2</Option>
                                </Select>
                            )
                        }
                        {
                            getFieldDecorator("goods",{
                                initialValue:'0'
                            })(
                                <Select style={{ width: '120px',marginRight:'20px'}}>
                                    <Option value="0">全部商品</Option>
                                    <Option value="1">11111</Option>
                                    <Option value="2">22222</Option>
                                </Select>
                            )
                        }
                        {
                            getFieldDecorator("status",{
                                initialValue:'0'
                            })(
                                <Select style={{ width: '120px',marginRight:'20px'}}>
                                    <Option value="0">全部</Option>
                                    <Option value="1">已售出</Option>
                                    <Option value="2">未售出</Option>
                                </Select>
                            )
                        }

                        <Button type="primary" className="btn btn-large btn-block btn-default">搜索</Button>
                    </div>
                    <div className="right_box">
                        <Button type="primary" style={{ marginRight: '10px' }} className="btn btn-large btn-block btn-default">批量删除</Button>
                        <Button type="danger" style={{ marginRight: '10px' }}  className="btn btn-large btn-block btn-default">添加虚拟卡</Button>
                        <Button type="primary"  className="btn btn-large btn-block btn-default" onClick={()=>this.exportExcel()}>导出卡密</Button>
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

