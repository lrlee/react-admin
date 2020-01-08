import React,{Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {Form,Input,Table,Switch,Modal,message} from 'antd'
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
    //确定修改分类
    modifySort(){
    
       this.props.form.validateFields((err,values)=>{
            if(!err){
                values.status?values.status=1:values.status=0
                ajax({
                    url:"/categoryController/editCategory.do",
                    method:'post',
                    data:values
                }).then(res=>{
                    message.success('修改成功')
                    this.props.changeVisible(false)
                    this.props.querySortList()
                }).catch(err=>{
                    message.error("修改失败")
                })
            }else{
                message.error("修改失败")
            }
       })
    } 
    onChange(){
        
    }
    render(){
        const {editSortInfo,visible}=this.props
        const {getFieldDecorator} = this.props.form
        return(
            <Modal
                visible = {visible}
                title='编辑分类'
                onCancel={()=>this.props.changeVisible(false)}
                onOk={()=>this.modifySort()}
            >
                <Form {...formItemLayout}>
                    <Form.Item label="分类id" style={{display:'none'}}>
                        {getFieldDecorator('id',{
                            initialValue:editSortInfo.id,
                            rules:[{required:true,message:'请填写分类名称'}]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="分类名称">
                        {getFieldDecorator('category_name',{
                            initialValue:editSortInfo.category_name,
                            rules:[{required:true,message:'请填写分类名称'}]
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="排序">
                        {getFieldDecorator('sort',{
                            initialValue:editSortInfo.sort,
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="状态">
                        {getFieldDecorator('status',{
                        })(<Switch defaultChecked={editSortInfo.status?true:false} onChange={()=>this.onChange()} />)}
                    </Form.Item>
                </Form> 
            </Modal>
        )
    }
}
const AddSortStyle=styled.div`
    .addSortBtn{
        line-height: 1.499;
        position: relative;
        display: inline-block;
        font-weight: 400;
        white-space: nowrap;
        text-align: center;
        background-image: none;
        border: 1px solid transparent;
        -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
        cursor: pointer;
        -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        height: 32px;
        padding: 0 15px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        background-color: #1890ff;
        border-color: #1890ff;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
        -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
        &:hover{
            color: #fff;
            background-color: #40a9ff;
            border-color: #40a9ff
        }
    }
`;
class AddSort extends Component {
    //添加分类
    addSort(e){
        e.preventDefault()
        this.props.form.validateFields((err,values)=>{
            if(!err){
                values['bussinessId']=this.props.userInfo.businessId
                ajax({
                    url:'/categoryController/saveCategory.do',
                    method:'post',
                    data:values
                }).then(res=>{
                    if(res.data.result){
                        this.props.addSortSuccess()
                        this.props.form.resetFields()
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
            <AddSortStyle>
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
                        <input className='addSortBtn' type="submit" value='添加分类'/>
                        {/* <Button type="submit" >添加分类</Button> */}
                    </Form.Item>
                </Form> 
            </AddSortStyle>
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
                dataIndex:'category_name'
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
        dataSource:[]
    }
    componentWillMount(){
        this.querySortList()
    }
    handleChange(){

    }
    changeVisible(flag){
        this.setState({visible:flag})
    }
    //添加分类成功
    addSortSuccess(){
        this.querySortList()
    }
    //查询分类
    querySortList(){
        ajax({
            url:`/categoryController/getCategory.do?bussinessId=${this.props.userInfo && this.props.userInfo.businessId}`
        }).then(res=>{
            this.setState({dataSource:res.data.data})
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
        this.setState({deleteVisible:true,deleteId:data.id})
    }
    //确定删除
    confirmDeleteSort(){
        const {deleteId} = this.state
        ajax({
            url:"/categoryController/delCategory.do",
            method:'post',
            data:{
                id:deleteId
            }
        }).then(res=>{
            this.setState({deleteVisible:false})
            this.querySortList()
        }).catch(err=>{
            message.error("删除失败")
        })
    }
    render(){
        const {columns,dataSource,editSortInfo,visible,deleteVisible} = this.state
        return(
            <SortStyle>
                <div className="addSort">
                    <AddSortForm addSortSuccess={()=>this.addSortSuccess()} />
                </div>
                <div className="sortList">
                    <Table dataSource={dataSource} columns={columns} />
                </div>
                <EditSortForm visible={visible} editSortInfo={editSortInfo} changeVisible={(flag)=>this.changeVisible(flag)} querySortList={()=>this.querySortList()} />
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
const mapStateToProps = state=>({
    userInfo:state.user
})
export default connect(mapStateToProps,null)(Sort);