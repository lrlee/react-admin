import React,{Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import ajax from '@/utils/ajax'
import {Upload, Icon,Form,Input,Select,Radio,Button, message} from 'antd';
const { Dragger } = Upload;
const {Option} = Select
const {TextArea} =Input
const AddCardStyle = styled.div`
    background:#fff;
    padding:20px 0;
    .ant-row.ant-form-item:nth-of-type(5){
        .ant-form-item-children{
            >span{
                display:flex;
            }
        }
    }
    .ant-form-item-children{
        display:flex;
    }
    .ant-radio-group{
        width:70vw;
        margin-right:20px;
    }
    .ant-upload.ant-upload-drag{
        padding:0 50px;
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
    state={
        goodsList:[],
        flag:true,
        fileData:[]
    }
    componentDidMount(){
        this.getGoodsList()
    }
    //获取商品列表
    getGoodsList(){
        ajax({
            url:'/goodsController/getGoods.do',
            params:{
                bussinessId:this.props.userInfo.businessId
            }
        }).then(res=>{
            if(res.data.result){
                this.setState({
                    goodsList:res.data.data
                })
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })
    }
    //添加虚拟卡
    addCard(){
        const {flag,fileData} = this.state
        let url = null
        console.log(flag,fileData,"flag777")
       
        this.props.form.validateFields((err,values)=>{
            if(flag){//手工输入
                url='/virtualCardController/addVirtualCard.do'
                values['virtualCard'] = values.virtualCard.split(/[\n]/)
            }else{//上传文档
                url='/virtualCardController/upLoadVirtualCards.do'
                values['filename']= fileData
            }
            

            if(!err){
                ajax({
                    url:url,
                    method:'post',
                    headers:{
                        'Content-Type':flag?'application/json':'multipart/form-data'
                    },
                    data:values
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
    changeType(e){
        const flag = e.target.value==='0'?false:true;
        console.log(flag,"flag")
        this.setState({
            flag
        })
    }
    //下载模板
    downloadTmp(){
        fetch('http://122.51.163.202:8080/virtualCardController/getUploadFile.do', {
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization':sessionStorage.getItem("token")
            },
            responseType: 'blob'
        }).then(res => res.blob()).then(data => {
            let blobUrl = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.download = '卡密模板.xls';
            a.href = blobUrl;
            a.click();
        })
    }
    uploadFile(info){
        console.log(info,"file")
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} 上传成功.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file 上传失败.`);
        }
    }
        // 拦截文件上传
    beforeUploadHandle=(file)=>{
        console.log(file,"file8888")
        this.setState(({fileData})=>({
            fileData:[...fileData,file],
        }))
        return false;
    }
    render(){
        const {getFieldDecorator} = this.props.form
        const {goodsList,flag,fileList} = this.state   
        console.log(flag,"flaggggg")
        const propsInfo = {
            name: 'file',
            multiple: true,
            accept:"application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            
            // customRequest:info=>{
            //     const formData = new FormData();
            //     formData.append('files[]',info.file);
            //     this.setState({
            //         fileList:formData
            //     })
            //     console.log(info,formData,"formData")
            //     // ajax({
            //     //     url:'',
            //     //     method:'post',
            //     //     data:formData,
            //     //     headers:{
            //     //         'Authorization':sessionStorage.getItem("token")
            //     //     }
            //     // }).then(res=>{
            //     //     console.log(res,"上传成功")
            //     // }).catch(err=>{
            //     //     console.log(err,"上传失败")
            //     // })
            //     // this.addCard()
            // }
          };
        return (
            <AddCardStyle>
                <Form {...formItemLayout} enctype="multipart/form-data" >
                    <Form.Item label="选择商品">
                        {
                            goodsList.length && (
                                getFieldDecorator('goods_id',{
                                    initialValue:this.props.location.state.goodsId || goodsList[0].id
                                })(
                                    <Select>
                                        {
                                            goodsList.map(v=><Option value={v.id}>{v.goods_name}</Option>)
                                        }
                                    </Select>
                                )
                            )
                        }
                    </Form.Item>
                    <Form.Item label="导入方式">
                        {
                            getFieldDecorator('goods',{
                                initialValue:'1'
                            })(
                                <Radio.Group onChange={(e)=>this.changeType(e)}>
                                    <Radio value="1">手动输入</Radio>
                                    <Radio value="0">excel导入</Radio>
                                </Radio.Group>
                            )
                        }
                        {
                            flag?null:<Button type="primary" onClick={()=>this.downloadTmp()}>下载模板</Button>
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
                    <Form.Item label='虚拟卡内容'>
                        {
                            flag?(
                                getFieldDecorator('virtualCard')(
                                   <TextArea row={4}/>
                                )
                            ):(
                                getFieldDecorator('filename')(
                                    <Dragger {...propsInfo}
                                        beforeUpload={this.beforeUploadHandle} 
                                    >
                                        <p className="ant-upload-drag-icon">
                                        <Icon type="inbox" />
                                        </p>
                                        <p className="ant-upload-text">点击或者拖动文件到此处上传</p>
                                    </Dragger>
                                )
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
                        <Button type="primary" style={{marginLeft:'20vw'}} onClick={()=>this.addCard()}>导入</Button>
                    </Form.Item>
                </Form>
            </AddCardStyle>
        )
    }
}
const mapStateToProps = state=>({
    userInfo:state.user
})
export default connect(mapStateToProps)(Form.create()(AddCard));