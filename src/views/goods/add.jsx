import React,{Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import { Form, Input, Select, Button ,Radio, message} from 'antd';
import ajax from '@/utils/ajax'
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const AddGoodsStyled = styled.div`
    background:#fff;
    padding:20px 0;
    .ant-form-item{
        .ant-form-item-children{
            .sortName_box{
                display:flex;
                .ant-select,.ant-input,.ant-radio-group{
                    width:30vw;
                    margin-right:20px;
                }
            }
           
        }
    }
`;
class AddGoods extends Component {
    state={
        sortList:[],
        goodsId:this.props.location && this.props.location.state && this.props.location.state.goodsId || null,
        goodsInfo:{}
    }
    componentDidMount(){
        this.getSortList()
        if(this.state.goodsId){
            this.getGoodsDetails()
        }
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
                this.setState({
                    sortList:res.data.data
                })
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.msg)
        })
    }
    //获取商品详情
    getGoodsDetails(){
        const {goodsId} = this.state
        ajax({
            url:`/goodsController/getGoodsInfoById.do?id=${goodsId}`,
        }).then(res=>{
            this.setState({
                goodsInfo:res.data.data
            })
        }).catch(err=>{
            message.error(err.data.msg)
        })
    }
    //保存
    save(){
        if(this.props.location.state.goodsId){//编辑
            this.editGoods()
        }else{
            this.addGoods()
        }
    }
    //新增商品
    addGoods(){
        this.props.form.validateFields((err,values)=>{
            if(!err){
                ajax({
                    url:"/goodsController/addGoods.do",
                    method:'post',
                    data:{...values,bussinessId:this.props.userInfo.businessId}
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
        })
    }
    //编辑商品
    editGoods(){
        const {goodsId} = this.state
        this.props.form.validateFields((err,values)=>{
            if(!err){
                ajax({
                    url:"/goodsController/modifyGoods.do",
                    method:'post',
                    data:{...values,bussinessId:this.props.userInfo.businessId,id:goodsId}
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
        })
    }
    render(){
        const {getFieldDecorator} = this.props.form
        const {sortList,goodsId,goodsInfo} = this.state
        return (
            <AddGoodsStyled>
                <Form {...formItemLayout}>
                    <Form.Item label="商品分类">
                        <div className="sortName_box">
                            {
                                
                                sortList.length && (
                                    getFieldDecorator('category_id',{
                                        initialValue:this.props.location && this.props.location.state && this.props.location.state.categoryId || sortList[0].id
                                    })(
                                        <Select>
                                            {
                                            sortList.map(v=>{
                                                return <Option value={v.id}>{v.category_name}</Option>
                                            })
                                            }
                                        </Select>
                                    )
                                )
                            }
                            <span className="tips_text">请选择商品分类</span>
                        </div>
                    </Form.Item>
                    <Form.Item label="商品排序">
                        <div className="sortName_box">
                            {
                                getFieldDecorator('sort',{
                                    initialValue:goodsInfo.sort || 0
                                })(
                                    <Input />
                                )
                            }
                            <span className="tips_text">数字越大越靠前!</span>
                        </div>
                         
                    </Form.Item>
                    <Form.Item label="商品名称">
                        <div className="sortName_box">
                            {
                                getFieldDecorator('goods_name',{
                                    initialValue:goodsInfo.goods_name || ""
                                })(
                                    <Input placeholder="商品名称" />
                                )
                            }
                            <span className="tips_text">好的名字有利于销售哦！</span>
                        </div>
                    </Form.Item>
                    <Form.Item label="商品价格">
                        
                        <div className="sortName_box">
                            {
                                getFieldDecorator('goods_price',{
                                    initialValue:goodsInfo.goods_price || ''
                                })(
                                    <Input placeholder="商品价格" />
                                )
                            }
                            <span className="tips_text">商品对外出售的价格即零售价格！</span>
                        </div>
                          
                    </Form.Item>
                    <Form.Item label="成本价格">
                        <div className="sortName_box">
                            {
                                getFieldDecorator('goods_cost_price',{
                                    initialValue:goodsInfo.goods_cost_price || ''
                                })(
                                    <Input placeholder="单位(元)" />
                                )
                            }
                            <span className="tips_text">商品进货价,可以不填,填写有利于商户系统的利润统计分析！</span>
                        </div>
                    </Form.Item>
                    <Form.Item label="短信费用">
                        <div className="sortName_box">
                            {
                                getFieldDecorator('sms_cost',{
                                    initialValue:goodsInfo.sms_cost || '1'
                                })(
                                    <Radio.Group>
                                        <Radio value="1">买家承担</Radio>
                                        <Radio value="0">商户承担</Radio>
                                    </Radio.Group>
                                )
                            }
                        </div>
                    </Form.Item>
                    <Form.Item label="起购数量">
                        <div className="sortName_box">
                            <div className="sortName_box">
                            {
                                getFieldDecorator('floor_num',{
                                    initialValue:goodsInfo.floor_num || '1'
                                })(
                                    <Input  />
                                )
                            }
                                <span className="tips_text">每次购买 最少购买多少件！</span>
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item label="提卡密码">
                        <div className="sortName_box">
                            <div className="sortName_box">
                            {
                                getFieldDecorator('tical_password',{
                                    initialValue:goodsInfo.tical_password || '0'
                                })(
                                    <Radio.Group>
                                        <Radio value="1">必填</Radio>
                                        <Radio value="2">选填</Radio>
                                        <Radio value="0">关闭</Radio>
                                    </Radio.Group>
                                )
                            }
                                <span className="tips_text">开启后，购买页面会提示买家填写取卡密码</span>
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item label="售出通知">
                            
                        <div className="sortName_box">
                            <div className="sortName_box">
                            {
                                getFieldDecorator('sold_info',{
                                    initialValue:goodsInfo.sold_info || '0'
                                })(
                                    <Radio.Group>
                                        <Radio value="1">开启</Radio>
                                        <Radio value="0">关闭</Radio>
                                    </Radio.Group>
                                )
                            }
                                <span className="tips_text">开启后，成功售卡将会发送邮件通知</span>
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item label="商品说明">      
                        <div className="sortName_box">
                            <div className="sortName_box">
                            {getFieldDecorator('goods_desc',{
                                initialValue:goodsInfo.goods_desc || ''
                            })(
                                <TextArea rows={4} placeholder="建议填写该商品的使用方法，文字不超过200字" />
                            )}
                                <span className="tips_text">商品说明将显示在商品购买页面</span>
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item label="使用说明">      
                        <div className="sortName_box">
                            <div className="sortName_box">
                            {getFieldDecorator('goods_use_desc',{
                                initialValue:goodsInfo.goods_use_desc || ''
                            })(
                                <TextArea rows={4} placeholder="建议填写该商品的使用方法，文字不超过200字" />
                            )}
                                <span className="tips_text">使用说明将显示在订单查询结果中，一般设置售后QQ群，或者下载地址类</span>
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item label="" >
                        <Button style={{marginLeft:'18vw'}} type="primary" onClick={(e)=>this.save()}>确认提交</Button>
                    </Form.Item>
                </Form>
            </AddGoodsStyled>
        )
    }
}
const mapStateToProps = state=>({
    userInfo:state.user
})
export default connect(mapStateToProps)(Form.create()(AddGoods))