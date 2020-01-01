import React,{Component} from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';

const formItemLayout = {
    labelCol:{
        xs:{span:18},
        sm:{span:5}
    },
    wrapperCol:{
        xs:{span:18},
        sm:{span:12}
    }
}
const ResetPasswordStyle = styled.div`
    background:#fff;
    padding:20px 0;
`;
class ResetPassword extends Component {
   
     render(){
        const {getFieldDecorator} = this.props.form
         return(
             <ResetPasswordStyle>
                <Form {...formItemLayout}>
                    <Form.Item label='旧密码'>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入旧密码' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label='新密码'>
                        {getFieldDecorator('newPassword', {
                            rules: [{ required: true, message: '请输入新密码' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label='确认新密码'>
                        {getFieldDecorator('newPassword', {
                            rules: [{ required: true, message: '请确认新密码' }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item>
                        <Button style={{marginLeft:'17vw'}} type="primary">保存设置</Button>
                    </Form.Item>
                </Form>
            </ResetPasswordStyle>
         )
     }
 }

 export default Form.create()(ResetPassword)