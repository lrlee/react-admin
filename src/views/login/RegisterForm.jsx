import React from 'react'
import { Form, Input, message } from 'antd'
import { calculateWidth } from '@/utils'
import PromptBox from '@/components/PromptBox'
import ajax from '@/utils/ajax'

class RegisterForm extends React.Component {
  state = {
    focusItem: -1
  }
  registerSubmit = (e) => {
    e.preventDefault()
    this.setState({
      focusItem: -1
    })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        ajax({
          url:"/userController/registeredUser.do",
          method:'post',
          data:values
        }).then(res=>{
          if(res.data.result){
            localStorage.setItem('users', JSON.stringify(res.data))
            message.success('注册成功')
          }else{
            message.error(res.data.msg)
          }
        }).catch(err=>{
          message.error(err)
          console.log(err,"err")
        })
      }
    })
  }
  gobackLogin = () => {
    this.props.switchShowBox('login')
    setTimeout(() => this.props.form.resetFields(), 500)
  }

  render () {
    const {getFieldDecorator, getFieldError, getFieldValue} = this.props.form
    const {focusItem} = this.state
    return (
      <div className={this.props.className}>
        <h3 className='title'>管理员注册</h3>
        <Form onSubmit={this.registerSubmit}>
          <Form.Item help={getFieldError('account') && <PromptBox info={getFieldError('account')} width={calculateWidth(getFieldError('account'))}/>}>
            {getFieldDecorator('account', {
              validateFirst: true,
              rules: [
                {required: true, message: '账户不能为空'},
                {pattern: '^[^ ]+$', message: '不能输入空格'},
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 0})}
                onBlur={() => this.setState({focusItem: -1})}
                maxLength={16}
                placeholder='账户'
                addonBefore={<span className='iconfont icon-User' style={focusItem === 0 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
          <Form.Item help={getFieldError('user_name') && <PromptBox info={getFieldError('user_name')} width={calculateWidth(getFieldError('user_name'))}/>}>
            {getFieldDecorator('user_name', {
              validateFirst: true,
              rules: [
                {required: true, message: '用户名不能为空'},
                {pattern: '^[^ ]+$', message: '不能输入空格'},
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 0})}
                onBlur={() => this.setState({focusItem: -1})}
                maxLength={16}
                placeholder='用户名'
                addonBefore={<span className='iconfont icon-User' style={focusItem === 0 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
          <Form.Item help={getFieldError('password') && <PromptBox info={getFieldError('password')} width={calculateWidth(getFieldError('password'))}/>}>
            {getFieldDecorator('password', {
              validateFirst: true,
              rules: [
                {required: true, message: '密码不能为空'},
                {pattern: '^[^ ]+$', message: '密码不能有空格'}
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 1})}
                onBlur={() => this.setState({focusItem: -1})}
                type='password'
                maxLength={16}
                placeholder='密码'
                addonBefore={<span className='iconfont icon-suo1' style={focusItem === 1 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
          {/* <Form.Item help={getFieldError('confirmPassword') && <PromptBox info={getFieldError('confirmPassword')} width={calculateWidth(getFieldError('confirmPassword'))}/>}>
            {getFieldDecorator('confirmPassword', {
              validateFirst: true,
              rules: [
                {required: true, message: '请确认密码'},
                {
                  validator: (rule, value, callback) => {
                    if (value && value !== getFieldValue('password')) {
                      callback('两次输入不一致！')
                    }
                    callback()
                  }
                },
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 2})}
                onBlur={() => this.setState({focusItem: -1})}
                type='password'
                maxLength={16}
                placeholder='确认密码'
                addonBefore={<span className='iconfont icon-suo1' style={focusItem === 2 ? styles.focus : {}}/>}/>
            )}
          </Form.Item> */}
          <Form.Item help={getFieldError('telphone') && <PromptBox info={getFieldError('telphone')} width={calculateWidth(getFieldError('telphone'))}/>}>
            {getFieldDecorator('telphone', {
              validateFirst: true,
              rules: [
                {required: true, message: '请输入电话号码'},
                {pattern: '/^[1][3,4,5,6,7,8,9][0-9]{9}$/', message: '请输入11位电话号码'}
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 1})}
                onBlur={() => this.setState({focusItem: -1})}
                type='text'
                maxLength={11}
                placeholder='电话号码'
                addonBefore={<span className='iconfont icon-suo1' style={focusItem === 1 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
          <Form.Item help={getFieldError('qq_num') && <PromptBox info={getFieldError('qq_num')} width={calculateWidth(getFieldError('qq_num'))}/>}>
            {getFieldDecorator('qq_num', {
              validateFirst: true,
              rules: [
                {required: true, message: '请输入qq号'},
                {pattern: '/^[1-9][0-9]{4,11}$/', message: '请输入qq号'}
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 1})}
                onBlur={() => this.setState({focusItem: -1})}
                type='text'
                maxLength={11}
                placeholder='qq号'
                addonBefore={<span className='iconfont icon-suo1' style={focusItem === 1 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
          <Form.Item help={getFieldError('mail') && <PromptBox info={getFieldError('mail')} width={calculateWidth(getFieldError('mail'))}/>}>
            {getFieldDecorator('mail', {
              validateFirst: true,
              rules: [
                {required: true, message: '请输入邮箱'},
                {pattern: '/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/', message: '请输入邮箱'}
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 1})}
                onBlur={() => this.setState({focusItem: -1})}
                type='text'
                placeholder='邮箱'
                addonBefore={<span className='iconfont icon-suo1' style={focusItem === 1 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
          <div className='bottom'>
            <input className='loginBtn' type="submit" value='注册'/>
            <span className='registerBtn' onClick={this.gobackLogin}>返回登录</span>
          </div>
        </Form>
        <div className='footer'>
          <div>欢迎登陆后台管理系统</div>
        </div>
      </div>
    )
  }
}

const styles = {
  focus: {
    width: '20px',
    opacity: 1
  },
}

export default Form.create()(RegisterForm)