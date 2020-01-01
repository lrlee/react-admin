import React,{Component} from 'react';
import styled from 'styled-components';
import {Form,Input,Select,Radio,Button} from 'antd';
const {Option} = Select
const {TextArea} =Input
const AddCardStyle = styled.div`
    background:#fff;
    padding:20px 0;
    .ant-form-item-children{
        display:flex;
    }
    .ant-radio-group{
        width:70vw;
        margin-right:20px;
    }
`;
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
class AddCard extends Component {
    render(){
        const {getFieldDecorator} = this.props.form
        return (
            <AddCardStyle>
                <Form {...formItemLayout}>
                    <Form.Item label="选择商品">
                        {
                            getFieldDecorator('goods',{
                                initialValue:'1'
                            })(
                                <Select>
                                    <Option value="1">11111</Option>
                                    <Option value="2">22222</Option>
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="导入方式">
                        {
                            getFieldDecorator('goods',{
                                initialValue:'1'
                            })(
                                <Radio.Group>
                                    <Radio value="1">手动输入</Radio>
                                    <Radio value="0">excel导入</Radio>
                                </Radio.Group>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="导入格式">
                        {
                            getFieldDecorator('importFormate',{
                                initialValue:'1'
                            })(
                                <Select>
                                    <Option value="1">自动识别</Option>
                                    <Option value="2">使用" "分割</Option>
                                    <Option value="2">使用","分割</Option>
                                    <Option value="2">使用"|"分割</Option>
                                    <Option value="2">使用"----"分割</Option>
                                    <Option value="2">不分割</Option>
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="格式演示">
                        <span className="text">AAAAAAAAAAA BBBBBBBBBBBB</span>
                    </Form.Item>
                    <Form.Item label="虚拟卡内容">
                        {
                            getFieldDecorator('cardContent')(
                                <TextArea row={4}/>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="检查重复卡" style={{height:'80px'}}>
                        {
                            getFieldDecorator('isRepeat',{
                                initialValue:'0'
                            })(
                                <Radio.Group>
                                    <Radio value="1">是</Radio>
                                    <Radio value="0">否</Radio>
                                </Radio.Group>
                            )
                        }
                        <span className="tips_text">格式：卡号+空格+密码，一行一张卡
如：A1B2C3D4F5E8 9876543210
最多一次添加500张(500行)</span>
                    </Form.Item>
                    <Form.Item label="">
                        <Button type="primary" style={{marginLeft:'20vw'}}>导入</Button>
                    </Form.Item>
                </Form>
            </AddCardStyle>
        )
    }
}

export default Form.create()(AddCard);