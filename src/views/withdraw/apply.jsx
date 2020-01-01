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
   
     render(){
        const {getFieldDecorator} = this.props.form
         return(
             <ApplyWithdrawStyle>
                <Form {...formItemLayout}>
                    <Form.Item label='今日可提现次数'>
                        {getFieldDecorator('applyNum')(<Input disabled/>)}
                    </Form.Item>
                    <Form.Item label='可提现金额'>
                        {getFieldDecorator('amount')(<Input disabled/>)}
                        <span className="tips_text">不可提现金额：<i className="redNum">0.000</i>元</span>
                    </Form.Item>
                    <Form.Item label='手续费'>
                        {getFieldDecorator('fee')(<Input disabled/>)}
                    </Form.Item>
                    <Form.Item label='提现金额'>
                        {getFieldDecorator('applyAmount')(<Input />)}
                        <span className="tips_text">注：最低提现金额50元</span>
                    </Form.Item>
                    <Form.Item>
                        <Button style={{marginLeft:'17vw'}} type="primary">申请提现</Button>
                    </Form.Item>
                </Form>
            </ApplyWithdrawStyle>
         )
     }
 }

 export default Form.create()(ApplyWithdraw)