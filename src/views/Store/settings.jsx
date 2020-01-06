import React, { Component } from 'react';
import styled from 'styled-components';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;
const { TextArea } = Input;
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

const UserSettingsStyled = styled.div`
    padding:20px;
    background:#fff;
  
    .title_box{
        width:100%;
        display:flex;
        .title{
            font-size:16px;
            width:50%;
        }
    }
    .form_box{
        .ant-form{
            height: 1335px;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            .ant-form-item{
                width:50%;
                .tips_box{
                    >p{
                        line-height:20px;
                        margin-bottom:5px;
                    }
                }
            }
        }
    }
`;

class UserSettings extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <UserSettingsStyled>
                <div className="settings_container">
                    <div className="title_box">
                        <p className="title">商户基本信息</p>
                        <p className="title">商户收款信息</p>
                    </div>
                    <div className="form_box">
                        <Form {...formItemLayout}>
                            <Form.Item
                                label="商户编号"
                            >
                                <span className="num">012022</span>
                            </Form.Item>
                            <Form.Item
                                label="用户名"
                            >
                                <span className="num">测试</span>
                            </Form.Item>
                            <Form.Item
                                label="电子邮箱"
                            >
                                <span className="num">2032252154@qq.com</span>
                            </Form.Item>
                            <Form.Item
                                label="手机号码"
                            >
                                {getFieldDecorator('telphone', {
                                    rules: [{ required: true, message: '请输入手机号码!' }],
                                })(<Input style={{ width: '100%' }} />)}
                                <div>
                                    <Button type="primary">获取验证码</Button>
                                </div>
                            </Form.Item>
                            <Form.Item
                                label="商户QQ"
                            >
                                {getFieldDecorator('qq_num', {
                                    rules: [{ required: true, message: '请输入商户qq号码!' }],
                                })(<Input style={{ width: '100%' }} />)}
                            </Form.Item>
                            <Form.Item
                                label="QQ群"
                            >
                                {getFieldDecorator('qq_group', {
                                    rules: [{ required: true, message: '请输入qq群号码!' }],
                                })(<Input style={{ width: '100%' }} />)}
                            </Form.Item>
                            <Form.Item
                                label="商户网站"
                            >
                                {getFieldDecorator('web_addr', {
                                    rules: [{ required: true, message: '请输入网站!' }],
                                })(<Input style={{ width: '100%' }} />)}
                                <did className="tops_box">
                                    <span>网址前面加http://或https://</span>
                                </did>
                            </Form.Item>
                            <Form.Item
                                label="店铺名称"
                            >
                                {getFieldDecorator('store_name', {
                                    rules: [{ required: true, message: '请输入店铺名称!' }],
                                })(<Input style={{ width: '100%' }} />)}
                            </Form.Item>
                            <Form.Item
                                label="店铺公告"
                            >
                                {getFieldDecorator('store_notice', {
                                    rules: [{ required: true, message: '请输入店铺公告!' }],
                                })(<TextArea rows={4} />)}
                            </Form.Item>
                            <Form.Item label="系统公告自动弹出" hasFeedback>
                                {getFieldDecorator('qqGroup')(
                                    <Select defaultValue="1">
                                        <Option value="1">是</Option>
                                        <Option value="2">否</Option>
                                    </Select>
                                    )}

                            </Form.Item>
                            <Form.Item label="商家公告自动弹出" hasFeedback>
                                {getFieldDecorator('qqGroup')(
                                    <Select defaultValue="1">
                                        <Option value="1">是</Option>
                                        <Option value="2">否</Option>
                                    </Select>
                                    )}
                            </Form.Item>
                            <Form.Item label="购卡协议自动弹出" hasFeedback>
                                {getFieldDecorator('is_auto')(
                                    <Select defaultValue="1">
                                        <Option value="1">是</Option>
                                        <Option value="2">否</Option>
                                    </Select>
                                    )}
                            </Form.Item>
                            <Form.Item label="库存展示方式" hasFeedback>
                                {getFieldDecorator('show_type')(
                                    <div className="container">
                                        <Select defaultValue="2">
                                            <Option value="1">实际库存</Option>
                                            <Option value="2">范围库存</Option>
                                        </Select>
                                        <div className="tips_box">
                                            <p className="tips">1. 库存大于100，显示 库存非常多</p>
                                            <p className="tips">2. 库存小于100、大于30，显示 库存很多</p>
                                            <p className="tips">3. 库存小于30、大于10，显示 库存一般</p>
                                            <p className="tips">4. 库存小于10，显示 库存少量</p>
                                        </div>
                                    </div>
                                    )}
                            </Form.Item>
                            <Form.Item label="提现方式" hasFeedback>
                                {getFieldDecorator('qqGroup')(
                                    <div className="container">
                                        <Select defaultValue="1">
                                            <Option value="1">系统默认</Option>
                                            <Option value="2">手工提现</Option>
                                            <Option value="3">自动提现</Option>
                                        </Select>
                                        <div className="tips_box">
                                            <p className="tips">说明：手工提现：手动申请提现。自动提现：金额满 50 元系统自动生成提款记录无需手工操作。</p>
                                        </div>
                                    </div>
                                    )}
                            </Form.Item>
                            <Form.Item label="费率承担" hasFeedback>
                                {getFieldDecorator('qqGroup')(
                                    <div className="container">
                                        <Select defaultValue="1">
                                            <Option value="1">跟随系统</Option>
                                            <Option value="2">商家承担</Option>
                                            <Option value="3">买家承担</Option>
                                        </Select>
                                    </div>
                                    )}
                            </Form.Item>
                            <Form.Item label="" >
                                <Button style={{marginLeft:'8vw'}} type="primary">保存设置</Button>
                            </Form.Item>
                            <Form.Item label="收款方式" hasFeedback>
                                <Input value="支付宝收款" disabled/>
                            </Form.Item>
                            <Form.Item label="支付宝账号" hasFeedback>
                                <Input value="30201245115@qq.com" disabled/>
                            </Form.Item>
                            <Form.Item label="收款人姓名" hasFeedback>
                                <Input value="测试" disabled/>
                            </Form.Item>
                            <Form.Item label="身份证号码" hasFeedback>
                                <Input value="513200012545484455" disabled/>
                            </Form.Item>
                            <Form.Item label="收款二维码" hasFeedback>
                                <img src="" alt=""/>
                                <div className="tips">
                                    *修改收款方式请联系客服
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </UserSettingsStyled>
        )
    }
}

export default Form.create()(UserSettings);