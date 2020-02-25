import React,{Component} from 'react';
import styled from 'styled-components';
import { Form, Input, Button,message} from 'antd';
import ajax from '@/utils/ajax'
import {connect} from 'react-redux'
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
const ApplyWithdrawStyle = styled.div`
    background:#fff;
    padding:20px 0;
    .ant-form-item{
        .ant-form-item-children{
            display:flex;
            .ant-select,.ant-input,.ant-radio-group{
                width:30vw;
                margin-right:20px;
            }
        
        }
    }
`;
class ApplyWithdraw extends Component {
    applyWithdraw(e){
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            console.log(err,values,"values")
            if (!err) {
                if(this.props.navInfo.tamount<values.withdraw_amount){
                    message.warn("余额不足")
                    return;
                }
              ajax({
                url:"/cashController/applyGetCash.do",
                method:'post',
                data:values
              }).then(res=>{
                  if(res.data.result){
                      message.success(res.data.msg)
                  }else{
                      message.error(res.data.msg)
                  }
              }).catch(err=>{
                message.error(err)
              })
            }
          })
    }
    render(){
        const {getFieldDecorator} = this.props.form
        const {navInfo} = this.props
        return(
            <ApplyWithdrawStyle>
            <Form {...formItemLayout} onSubmit={(e)=>this.applyWithdraw(e)}>
                <Form.Item label='今日可提现次数'>
                    {getFieldDecorator('applyNum',{
                        initialValue:navInfo.tamount || 0
                    })(<Input disabled/>)}
                </Form.Item>
                <Form.Item label='可提现金额'>
                    {getFieldDecorator('amount',{
                        initialValue:navInfo.wamount-navInfo.tamount || 0
                    })(<Input disabled/>)}
                    <span className="tips_text">不可提现金额：<i className="redNum" style={{fontStyle:"normal"}}>0.000</i>元</span>
                </Form.Item>
                <Form.Item label='手续费'>
                    {getFieldDecorator('fee',{
                        initialValue:0.03
                    })(<Input disabled/>)}
                </Form.Item>
                <Form.Item label='提现金额'>
                    {getFieldDecorator('withdraw_amount',{
                        initialValue:50
                    })(<Input />)}
                    <span className="tips_text">注：最低提现金额50元</span>
                </Form.Item>
                <Form.Item>
                    <input style={{marginLeft:'17vw'}} type="submit" className="search-btn" value="申请提现"/>
                </Form.Item>
            </Form>
        </ApplyWithdrawStyle>
        )
    }
 }
const mapStateToProps = state=>({
    userInfo:state.user,
    navInfo:state.navInfo
})
 export default connect(mapStateToProps,null)(Form.create()(ApplyWithdraw))