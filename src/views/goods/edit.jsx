import React,{Component} from 'react'
import styled from 'styled-components'
import {Form,Input,Modal} from 'antd'
class EditSort extends Component {
    componentDidUpdate(prevProps){
        console.log(prevProps,this.props,"props")
    }
    render(){
        const {editSortInfo,visible,getFieldDecorator}=this.props
        console.log(visible,this.props,"visi")
        return (
            <div>
               
            </div>
        )
    }
}

export default Form.create(EditSort);