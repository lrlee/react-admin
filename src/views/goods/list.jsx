import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { Form, Input, Select, Button, Table, Switch } from 'antd';

const { Option } = Select;
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
                title:'代理授权码',
                dataIndex:'code'
            },
            {
                title:'价格',
                dataIndex:'price'
            },
            {
                title:'代理价格',
                dataIndex:'proxy_price'
            },
            {
                title:'库存(张)',
                dataIndex:'inventory'
            },
            {
                title:'卖出(张)',
                dataIndex:'sale'
            },
            {
                title:'上下架',
                dataIndex:'status',
                render:(text,record)=>{
                    if (record.status) {
                        return <Switch checked={true} onChange={this.handleChange} />
                    } else {
                        return <Switch checked={false} onChange={this.handleChange} />
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
                            <Link to='/store/link'>链接</Link>
                            <Link to='/goods/add'>加卡</Link>
                            <Link to='/store/link'>编辑</Link>
                            <span className="export_btn" onClick={()=>this.deleteSort()}>删除</span>
                            <span className="clear_btn" onClick={()=>this.clearSort()}>清空</span>
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
    render() {
        const {columns,dataSource}=this.state
        const { getFieldDecorator } = this.props.form;
        return (
            <GooodListStyle>
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
                        <Button type="danger" className="btn btn-large btn-block btn-default">添加商品</Button>
                    </div>
                </div>
                <div className="table_list_box">
                    <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
                </div>
            </GooodListStyle>
        )
    }
}

export default Form.create()(GoodsList);

