import React,{Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {Form,Button,Input,Table,Switch,Modal} from 'antd'
const SortStyle=styled.div`
    background:#fff;
    padding:20px;
    .action_box{
        a{
            margin-right:10px;
        }
        span{
            color: #1890ff;
            margin-right:10px;
            cursor:pointer;
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
        //删除弹框显隐
        deleteVisible:false,
        //编辑弹框显隐
        visible:false,
        //编辑分类的信息
        editSortInfo:{

        },
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
                    if(record.status){
                        return <Switch defaultChecked onChange={this.handleChange} />
                    }else{
                        return <Switch  onChange={this.handleChange} />
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
                            <Link to={
                                {
                                    pathname:'/store/link',
                                    state:{
                                        title:'商铺链接'
                                    }
                                }
                            }>链接</Link>
                            <Link to={{
                                pathname:'/goods/list',
                                state:{
                                    title:'商品列表'
                                }
                            }}>商品</Link>
                            <Link to={{
                                pathname:'/card/list',
                                state:{
                                    title:'虚拟卡列表'
                                }
                            }}>库存卡</Link>
                            <span onClick={()=>this.editSort(record)}>编辑</span>
                            <span onClick={()=>this.deleteSort(record)}>删除</span>
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
    //编辑分类
    editSort(data){
        this.setState({visible:true,editSortInfo:data})
    }
    //删除分类
    deleteSort(data){
        this.setState({deleteVisible:true})
    }
    render(){
        const {columns,dataSource,editSortInfo,visible,deleteVisible} = this.state
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
                <Modal
                    visible = {visible}
                    title='编辑分类'
                    onCancel={()=>this.setState({visible:false})}
                    onOk={()=>this.addSort()}
                >
                    <Form>
                        <Form.Item label="分类名称">
                            {getFieldDecorator('editSortName',{
                                initialValue:editSortInfo.name,
                                rules:[{required:true,message:'请填写分类名称'}]
                            })(<Input/>)}
                        </Form.Item>
                        <Form.Item label="排序">
                            {getFieldDecorator('editSortRank',{
                                initialValue:editSortInfo.sort,
                            })(<Input/>)}
                        </Form.Item>
                    </Form> 
                </Modal>
                <Modal 
                    visible = {deleteVisible}
                    title='删除分类'
                    onCancel={()=>this.setState({deleteVisible:false})}
                    onOk={()=>this.deleteSort()}
                >
                    确定删除该分类吗？

                </Modal>
            </SortStyle>
        )
    }
}

export default Form.create()(Sort);