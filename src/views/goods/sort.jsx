import React,{Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {Form,Button,Input,Table,Switch,Modal,message} from 'antd'
import ajax from '@/utils/ajax'
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
class EditSort extends Component {
    render(){
        const {editSortInfo,visible}=this.props
        const {getFieldDecorator} = this.props.form
        return(
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
        )
    }
}
class AddSort extends Component {
    //添加分类
    addSort(e){
        e.preventDefault()
        this.props.form.validateFields((err,values)=>{
            if(!err){
                ajax({
                    url:'/categoryController/saveCategory.do',
                    params:values
                }).then(res=>{
                    if(res.data.result){
                        message.success(res.data.msg)
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
    render(){
        const {getFieldDecorator} = this.props.form
        return(
            <Form layout='inline' onSubmit={(e)=>this.addSort(e)}>
                <Form.Item>
                    {getFieldDecorator('category_name',{
                        rules:[{required:true,message:'请填写分类名称'}]
                    })(<Input placeholder="分类名称"/>)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('sort')(<Input placeholder='排序'/>)}
                </Form.Item>
                <Form.Item>
                    <input className='loginBtn' type="submit" value='添加分类'/>
                    {/* <Button type="submit" >添加分类</Button> */}
                </Form.Item>
            </Form> 
        )
    }
}
const AddSortForm = Form.create()(AddSort)
const EditSortForm = Form.create()(EditSort)
class Sort extends Component {
    state={
        //要删除的分类id
        deleteId:null,
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
    componentWillMount(){
        this.querySortList()
    }
    handleChange(){

    }
    //查询分类
    querySortList(){
        ajax({
            url:`/categoryController/getCategory.do?bussinessId=${window.bussionId}`
        }).then(res=>{
            console.log(res,"red")
        }).catch(err=>{
            console.log(err,"eee")
        })
    }
    //编辑分类
    editSort(data){
        this.setState({visible:true,editSortInfo:data})
    }
    //删除分类
    deleteSort(data){
        this.setState({deleteVisible:true})
    }
    //确定删除
    confirmDeleteSort(){

    }
    render(){
        const {columns,dataSource,editSortInfo,visible,deleteVisible} = this.state
        return(
            <SortStyle>
                <div className="addSort">
                    <AddSortForm/>
                </div>
                <div className="sortList">
                    <Table dataSource={dataSource} columns={columns} />
                </div>
                <EditSortForm visible={visible} editSortInfo={editSortInfo}  />
                <Modal 
                    visible = {deleteVisible}
                    title='删除分类'
                    onCancel={()=>this.setState({deleteVisible:false})}
                    onOk={()=>this.confirmDeleteSort()}
                >
                    确定删除该分类吗？

                </Modal>
            </SortStyle>
        )
    }
}

export default Sort;