import React,{Component} from 'react';
import styled from 'styled-components';
import {Button} from 'antd';
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
    render(){
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

export default StoreLinks;