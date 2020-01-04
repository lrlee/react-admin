import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { Form, Input, Select, Button, Table, Switch, Modal } from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const { Column, ColumnGroup } = Table;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};
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
        //恢复弹框显隐
        restoreVisivle:false,
        //删除弹框显隐
        deleteVisible:false,
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
                            <span className="clear_btn" onClick={()=>this.restoreGoods()}>恢复</span>
                            <span className="delete_btn" onClick={()=>this.deleteGoods()}>删除</span>
                        </div>
                    )
                }
            }
        ],
        dataSource: [
            {
                id: 1,
                name: '分类1',
                sort: 1,
                status: 0,
                create_time: '2019-12-28',
                goodsName:"AAAAAAAA",
                price:20.00,
                code:'aaabbbb',
                proxy_price:18,
                inventory:5,
                sale:1
            },
            {
                id: 2,
                name: '分类2',
                sort: 0,
                status: 1,
                create_time: '2019-12-28'
            },
            {
                id: 3,
                name: '分类3',
                sort: 1,
                status: 1,
                create_time: '2019-12-28'
            }
        ]
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
        const {columns,dataSource,restoreVisivle,deleteVisible}=this.state
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

export default Form.create()(RecycleList);

