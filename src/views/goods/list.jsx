import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { Form, Input, Select, Button, Table, Switch, Modal, message } from 'antd';
import ajax from '@/utils/ajax'
const { Option } = Select;
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

class GoodsList extends Component {
    state = {
        //分类列表
        sortList:[],
        selectGoodsIds:[],
        //删除商品id
        deleteGoodsIds:[],
        //删除分类弹框显隐
        deletSortVisible:false,
        //清空分类弹框显隐
        clearSortVisible:false,
        columns: [
            {
                title: '商品分类',
                dataIndex: 'category_name',
                key:1
            },
            {
                title: '排序(值越大越排前)',
                dataIndex: 'sort',
                key:2
            },
            {
                title:'商品名称',
                dataIndex:'goods_name',
                key:3
            },
            {
                title:'代理授权码',
                dataIndex:'code',
                key:4
            },
            {
                title:'价格',
                dataIndex:'goods_price',
                key:5
            },
            {
                title:'代理价格',
                dataIndex:'goods_cost_price',
                key:6
            },
            {
                title:'库存(张)',
                dataIndex:'inventory',
                key:7
            },
            {
                title:'卖出(张)',
                dataIndex:'sale',
                key:8
            },
            {
                title:'上下架',
                dataIndex:'status',
                key:9,
                render:(text,record)=>{
                    if (record.status) {
                        return <Switch defaultChecked onChange={()=>this.handleChange(record)} />
                    } else {
                        return <Switch  onChange={()=>this.handleChange(record)} />
                    }
                }
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key:10
            },
            {
                title: '操作',
                dataIndex: 'action',
                key:11,
                render: (text, record) => {
                    return (
                        <div className="action_box">
                            <Link to={{
                                pathname:'/store/link',
                                state:{
                                    title:'店铺链接'
                                }
                            }}>链接</Link>
                            <Link to={{
                                pathname:'/card/add',
                                state:{
                                    title:'添加虚拟卡',
                                    goodsId:record.id
                                }
                            }}>加卡</Link>
                            <Link to={{
                                pathname:'/goods/add',
                                state:{
                                    title:'编辑商品',
                                    categoryId:record.category_id,
                                    goodsId:record.id
                                }
                            }}>编辑</Link>
                            <span className="export_btn" onClick={()=>this.deleteGoods(record)}>删除</span>
                            <span className="export_btn" onClick={()=>this.clearCard(record)}>清空虚拟卡</span>
                        </div>
                    )
                }
            }
        ],
        dataSource: []
    }
    componentDidMount(){
        this.getGoodsList()
        this.getSortList()
    }
    handleChange(data){
        ajax({
            url:'goodsController/changeStatus.do',
            method:'post',
            data:{
                id:data.id
            }
        }).then(res=>{
            if(res.data.result){
                message.success(res.data.msg)
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })
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
    //获取商品列表
    getGoodsList(){
        ajax({
            url:'/goodsController/getGoods.do',
            params:{
                bussinessId:this.props.userInfo.businessId
            }
        }).then(res=>{
            if(res.data.result){
                this.setState({dataSource:res.data.data})
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })
    }
    //导出报表
    exportExcel(){
        const {selectGoodsIds} = this.state
        if(!selectGoodsIds.length){
            message.warning("请选择需要导出的数据")
            return;
        }
        fetch('http://122.51.163.202:8080/goodsController/exportGoods.do', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':sessionStorage.getItem("token")
            },
            responseType: 'blob',
            body: JSON.stringify(selectGoodsIds),
        }).then(res => res.blob()).then(data => {
            let blobUrl = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.download = '商品表.xls';
            a.href = blobUrl;
            a.click();
        })
        // ajax({
        //     url:'/goodsController/exportGoods.do',
        //     method:'post',
        //     data:selectGoodsIds
        // }).then(res=>{
        //     console.log(res,"ssdddd")
        //   //  window.open(res.data.data)
        //   this.download(res.data.data)
        // }).catch(err=>{
        //     message.error(err.data.msg)
        // })
    }
    download(filename){
        var oReq = new XMLHttpRequest();
        oReq.open("GET", 'http://122.51.163.202:8080/goodsController/exportGoods.do', true);
        oReq.responseType = "blob";
        oReq.onload = function (oEvent) {
            var content = oReq.response;
            console.log(oEvent,"")
            var elink = document.createElement('a');
            elink.download = filename;
            elink.style.display = 'none';

            var blob = new Blob([content]);
            elink.href = URL.createObjectURL(blob);

            document.body.appendChild(elink);
            elink.click();

            document.body.removeChild(elink);
        };
    }
    //批量删除
    batchDeletion(){
        const {selectGoodsIds} = this.state
        if(!selectGoodsIds.length){
            message.warning("请选择需要删除的数据")
            return;
        }
        this.setState({deletSortVisible:true,deleteGoodsIds:selectGoodsIds})
    }
    //清空虚拟卡
    clearCard(){
        this.setState({clearSortVisible:true})
    }
    //删除商品
    deleteGoods(data){
        this.setState({deletSortVisible:true,deleteGoodsIds:[data.id]})
    }
    //确定删除商品
    comDeleteGoods(){
        const {deleteGoodsIds} =this.state
        ajax({
            url:"/goodsController/delGoods.do",
            method:'post',
            data:deleteGoodsIds
        }).then(res=>{
            if(res.data.result){
                message.success(res.data.msg)
                this.setState({
                    deletSortVisible:false
                })
                this.getGoodsList()
            }
        })
    }
    toAddGoods(){
        this.props.history.push({
            pathname:'/goods/add'
        })
    }
    //搜索
    search(e){
        e.preventDefault()
        this.props.form.validateFields((err,values)=>{
            if(!err){
                values['bussinessId']=this.props.userInfo.businessId
                ajax({
                    url:`/goodsController/getGoods.do?bussinessId=${values.bussinessId}&param=${values.param || ''}&category_name=${values.category_name}`,
                }).then(res=>{
                    if(res.data.result){
                        console.log(res,"success")
                        this.setState({
                            dataSource:res.data.data ||[]
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
    getSelectData(selectedRowKeys,selectedRows){
        this.setState({selectGoodsIds:selectedRows.length?selectedRows.map(v=>v.id):[]})
    }
    render() {
        const {columns,dataSource,deletSortVisible,clearSortVisible,sortList}=this.state
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
                                initialValue:''
                            })(
                                <Select style={{ width: '120px'}}>
                                    <Option value="">全部分类</Option>
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
                            {/* <input className='addSortBtn' type="submit" value='添加分类'/> */}
                           <input type="submit" className="btn btn-large btn-block btn-default search-btn" value="搜索"/>
                        </Form.Item>
                    </Form> 
                    </div>
                    <div className="right_box">
                        <Button type="primary" style={{ marginRight: '10px' }} className="btn btn-large btn-block btn-default" onClick={()=>this.exportExcel()}>导出</Button>
                        <Button type="primary" style={{ marginRight: '10px' }} className="btn btn-large btn-block btn-default" onClick={()=>this.batchDeletion()}>批量删除</Button>
                        <Button type="danger" className="btn btn-large btn-block btn-default" onClick={()=>this.toAddGoods()}>添加商品</Button>
                    </div>
                </div>
                <div className="table_list_box">
                    <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
                </div>
                <Modal 
                    visible={deletSortVisible}
                    title='删除分类'
                    onCancel={()=>this.setState({deletSortVisible:false})}
                    onOk={()=>this.comDeleteGoods()}
                >
                    <p className="tips" style={{fontSize:'20px',textAlign:'center'}}>确定删除该商品吗？</p>
                    <p style={{fontSize:'14px',textAlign:'center'}}>删除的商品将进入回收站</p>
                </Modal>
                <Modal
                    visible={clearSortVisible}
                    title='清空虚拟卡'
                    onCancel={()=>this.setState({clearSortVisible:false})}
                    onOk={()=>this.clearCard()}
                >
                    <p style={{fontSize:'20px',textAlign:'center',color:'#000'}}>确定清空该商品所有未售虚拟卡吗？</p>
                    <p style={{fontSize:'14px',textAlign:'center'}}>删除的虚拟卡将进入回收站</p>
                </Modal>
            </GooodListStyle>
        )
    }
}
const mapStateToProps=state=>({
    userInfo:state.user
})
export default connect(mapStateToProps)(Form.create()(GoodsList));

