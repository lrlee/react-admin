import React,{Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import {Button, message} from 'antd';
import ajax from '@/utils/ajax'
const LinksStyle = styled.div`
    padding:20px;
    background:#fff;
    .links_list{
        .links_item{
            margin-bottom:20px;
            display:flex;
            flex-direction: column;
            .link_box{
                button{
                    margin-left:20px;
                }
            }
            >img{
                width:90px;
                height:90px;
            }
        }
    }
`;

class StoreLinks extends Component {
    state={
        links:{

        }
    }
    componentDidMount(){
        this.getLinks()
    }
    //获取店铺链接
    getLinks(){
        ajax({
            url:"/businessController/getUrlInfo.do",
            params:{
                bussinessId:this.props.userInfo.businessId
            }
        }).then(res=>{
            if(res.data.result){
                this.setState({
                    links:res.data.web
                })
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })
    }
    render(){
        const {links} = this.state
        console.log(this.props,"props")
        return (
            <LinksStyle>
                <ul className="links_list">
                    <li className="links_item">
                        <span className="sort">1、系统单一支付地址</span>
                        <div className="link_box">
                            <a href="http://www.juzifaka.com/links/B423884B" target="_blank">http://www.juzifaka.com/links/B423884B</a>
                            <Button type="primary">复制链接</Button>
                        </div>
                        <span className="tips">商品和分类的独立链接请在商品分类和商品列表中获取</span>
                    </li>
                    <li className="links_item">
                        <span className="sort">2、店铺开启或关闭</span>
                        <div className="link_box">
                            <span className="tips">用户访问店铺购卡页面则变成店铺关闭提示页面</span>
                            <Button type="primary">关闭店铺</Button>
                        </div>
                    </li>
                    <li className="links_item">
                        <span className="sort">3、短网址</span>
                        <div className="link_box">
                            <a href="http://www.juzifaka.com/links/B423884B" target="_blank">http://www.juzifaka.com/links/B423884B</a>
                            <Button type="primary">复制链接</Button>
                        </div>
                        <div className="btns">
                            <Button type="primary">关闭链接</Button>
                        </div>
                    </li>
                    <li className="links_item">
                        <span className="sort">4、二维码地址</span>
                        <img src="" alt=""/>
                    </li>
                </ul>
            </LinksStyle>
        )
    }
}
const mapStateToProps = state =>({
    userInfo:state.user
})
export default connect(mapStateToProps)(StoreLinks);