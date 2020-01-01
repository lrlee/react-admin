import React,{Component} from 'react';
import styled from 'styled-components';
import { Form, Input, Select, Button ,Radio} from 'antd';
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
    render(){
        const {getFieldDecorator} = this.props.form
        return (
            <AddGoodsStyled>
                <Form {...formItemLayout}>
                    <Form.Item label="商品分类">
                        {
                            getFieldDecorator('sortName')(
                                <div className="sortName_box">
                                    <Select defaultValue="1">
                                        <Option value="1">分类1</Option>
                                        <Option value="2">分类2</Option>
                                        <Option value="3">分类</Option>
                                    </Select>
                                    <span className="tips_text">请选择商品分类</span>
                                </div>
                            )
                        }
                        
                    </Form.Item>
                    <Form.Item label="商品排序">
                        {
                            getFieldDecorator('goodsNum')(
                                <div className="sortName_box">
                                    <Input value="0"/>
                                    <span className="tips_text">数字越大越靠前!</span>
                                </div>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="商品名称">
                        {
                            getFieldDecorator('goodsName')(
                                <div className="sortName_box">
                                    <Input placeholder="商品名称" />
                                    <span className="tips_text">好的名字有利于销售哦！</span>
                                </div>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="商品价格">
                        {
                            getFieldDecorator('goodsPrice')(
                                <div className="sortName_box">
                                    <Input placeholder="商品价格" />
                                    <span className="tips_text">商品对外出售的价格即零售价格！</span>
                                </div>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="成本价格">
                        {
                            getFieldDecorator('goodsPrice')(
                                <div className="sortName_box">
                                    <Input placeholder="单位(元)" />
                                    <span className="tips_text">商品进货价,可以不填,填写有利于商户系统的利润统计分析！</span>
                                </div>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="短信费用">
                        {
                            getFieldDecorator('discount')(
                                <div className="sortName_box">
                                    <Radio.Group defaultValue="1">
                                        <Radio value="1">买家承担</Radio>
                                        <Radio value="0">商户承担</Radio>
                                    </Radio.Group>
                                </div>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="起购数量">
                        {
                            getFieldDecorator('discount')(
                                <div className="sortName_box">
                                    <div className="sortName_box">
                                        <Input value="1" />
                                        <span className="tips_text">每次购买 最少购买多少件！</span>
                                    </div>
                                </div>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="提卡密码">
                        {
                            getFieldDecorator('discount')(
                                <div className="sortName_box">
                                    <div className="sortName_box">
                                        <Radio.Group defaultValue="0">
                                            <Radio value="1">必填</Radio>
                                            <Radio value="2">选填</Radio>
                                            <Radio value="0">关闭</Radio>
                                        </Radio.Group>
                                        <span className="tips_text">开启后，购买页面会提示买家填写取卡密码</span>
                                    </div>
                                </div>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="售出通知">
                        {
                            getFieldDecorator('discount')(
                                <div className="sortName_box">
                                    <div className="sortName_box">
                                        <Radio.Group defaultValue="0">
                                            <Radio value="1">开启</Radio>
                                            <Radio value="0">关闭</Radio>
                                        </Radio.Group>
                                        <span className="tips_text">开启后，成功售卡将会发送邮件通知</span>
                                    </div>
                                </div>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="商品说明">      
                        <div className="sortName_box">
                            <div className="sortName_box">
                            {getFieldDecorator('discount')(
                                <TextArea rows={4} placeholder="建议填写该商品的使用方法，文字不超过200字" />
                            )}
                                <span className="tips_text">商品说明将显示在商品购买页面</span>
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item label="使用说明">      
                        <div className="sortName_box">
                            <div className="sortName_box">
                            {getFieldDecorator('discount')(
                                <TextArea rows={4} placeholder="建议填写该商品的使用方法，文字不超过200字" />
                            )}
                                <span className="tips_text">使用说明将显示在订单查询结果中，一般设置售后QQ群，或者下载地址类</span>
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item label="" >
                        <Button style={{marginLeft:'18vw'}} type="primary">确认提交</Button>
                    </Form.Item>
                </Form>
            </AddGoodsStyled>
        )
    }
}
export default Form.create()(AddGoods)