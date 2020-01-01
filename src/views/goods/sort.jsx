import React,{Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import {Form,Button,Input,Table,Switch                                                                                                                                                                                                                                                     } from 'antd'
const SortStyle=styled.div`
    background:#fff;
    padding:20px;
    .action_box{
        a{
            margin-right:10px;
        }
    }
    .sortList{
        margin-top:20px;
    }
`;
const formItemLayout = {
    labelCol:{
        xs:{span:8},
        sm:{span:5}
    },
    wrapperCol:{
        xs:{span:8},
        sm:{span:12}
    }
}
class Sort extends Component {
    state={
        columns:[
            {
                title:'分类名称',
                dataIndex:'name'
            },
            {
                title:'排序(值越大越排前)',
                dataIndex:'sort'
            },
            {
                title:'状态',
                dataIndex:'status',
                render:(text,record)=>{
                    console.log(text,record,"record")
                    if(record.status){
                        return <Switch checked={true} onChange={this.handleChange} />
                    }else{
                        return <Switch checked={false} onChange={this.handleChange} />
                    }
                    
                }
            },
            {
                title:'创建时间',
                dataIndex:'create_time'
            },
            {
                title:'操作',
                dataIndex:'action',
                render:(text,record)=>{
                    return (
                        <div className="action_box">
                            <Link to='/store/link'>链接</Link>
                            <Link to='/goods/list'>商品</Link>
                            <Link to='/card/list'>库存卡</Link>
                            <Link to='/store/link'>编辑</Link>
                            <Link to='/store/link'>删除</Link>
                        </div>
                    )
                }
            }
        ],
        dataSource:[
            {
                id:1,
                name:'分类1',
                sort:1,
                status:0,
                create_time:'2019-12-28'
            },
            {
                id:2,
                name:'分类2',
                sort:0,
                status:1,
                create_time:'2019-12-28'
            },
            {
                id:3,
                name:'分类3',
                sort:1,
                status:1,
                create_time:'2019-12-28'
            }
        ]
    }
    handleChange(){

    }
    render(){
        const {columns,dataSource} = this.state
        const {getFieldDecorator} = this.props.form
        return(
            <SortStyle>
                <div className="addSort">
                    <Form layout='inline'>
                        <Form.Item>
                            {getFieldDecorator('sortName',{
                                rules:[{required:true,message:'请填写分类名称'}]
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('sortName')(<Input/>)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">添加分类</Button>
                        </Form.Item>
                    </Form> 
                </div>
                <div className="sortList">
                    <Table dataSource={dataSource} columns={columns} />
                </div>
            </SortStyle>
        )
    }
}

export default Form.create()(Sort);