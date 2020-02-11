import React,{Component} from 'react';
import styled from 'styled-components';
import { Form, Input, Button, message } from 'antd';
import {connect} from 'react-redux'
import ajax from '@/utils/ajax'
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
    //新密码一致校验
    handleCheckPwd(rules,value,callback){
        let cfmPwd = this.props.form.getFieldValue('newPasswordCom');
        if(cfmPwd && cfmPwd !== value){
            callback(new Error('两次密码输入不一致'))
        }else{
            // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
            callback();
        }
    }

    //确认密码校验一致
    handleCfmPwd(rules,value,callback){
        let loginpass = this.props.form.getFieldValue('newPassword');
        if(loginpass && loginpass !== value){
            callback(new Error('两次密码输入不一致'))
        }else{
            
            // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
            callback();
        }
    }
    //重置密码
    resetPassword(){
        this.props.form.validateFields((err,values)=>{
            if(!err){
                ajax({
                    url:'/userController/changePassword.do',
                    method:'post',
                    data:{
                        account:this.props.userInfo.account,
                        oldPassword:values.oldPassword,
                        newPassword:values.newPassword
                    }
                }).then(res=>{
                    if(res.data.result){
                        message.success(res.data.msg)
                        sessionStorage.setItem('token',"")
                        sessionStorage.setItem("userInfo","")
                        window.location = '/login'
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
         return(
             <ResetPasswordStyle>
                <Form {...formItemLayout}>
                    <Form.Item label='旧密码' >
                        {getFieldDecorator('oldPassword', {
                            rules: [{ required: true, message: '请输入旧密码' }],
                        })(<Input type="password" autoComplete='off'/>)}
                    </Form.Item>
                    <Form.Item label='新密码'>
                        {getFieldDecorator('newPassword', {
                          rules: [{ required: true, message: '请输入新密码' },{
                                validator:(rules,value,callback)=>{
                                    this.handleCheckPwd(rules,value,callback)
                                }
                            }],
                            validateFirst:true
                        })(<Input type="password" autoComplete='off' />)}
                    </Form.Item>
                    <Form.Item label='确认新密码'>
                        {getFieldDecorator('newPasswordCom', {
                            rules: [{ required: true, message: '请确认新密码' },{
                                validator:(rules,value,callback)=>{
                                    this.handleCfmPwd(rules,value,callback)
                                }
                            }],
                            validateFirst:true
                        })(<Input type="password" autoComplete='off' />)}
                    </Form.Item>
                    <Form.Item>
                        <Button style={{marginLeft:'17vw'}} type="submit primary" onClick={()=>this.resetPassword()}>保存设置</Button>
                    </Form.Item>
                </Form>
            </ResetPasswordStyle>
         )
     }
 }
const mapStateToProps = state =>({
    userInfo:state.user
})
export default connect(mapStateToProps,null)(Form.create()(ResetPassword))