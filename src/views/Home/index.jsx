import React,{Component} from 'react';
import styled from 'styled-components';
import {List,Card,Icon,Row,Col} from 'antd';
import Echarts from '@/views/Echarts';
import TableList from '@/components/table'
const HomeStyled = styled.div`
    padding:20px;
    .ant-card{
        border-radius:8px; 
    }
    .item_box{
        border-radius:8px;
        .ant-card-body{
            display:flex;
            flex-direction: column;
            align-items:center;
            justify-content:center;
            .num{
                font-size:18px;
                color:#679bdc;
            }
            .bottom_box{
                margin-top:30px;
                >i{
                    color:#679bdc;
                    font-size:14px;
                }
            }
        }
    }
    .echarts_box{
        background:#fff;
        padding:20px;
        border-radius:8px;
    }
    .order_list_box{
        margin-top:20px;
        background:#fff;
        padding:20px;
        .title{
            padding:20px 0 0 20px;
        }
        .ant-table-thead{
            >tr{
                >th{
                    background:#fff;
                }
            }
        }
    }
`;
const data =[
    {
        num:'0.00',
        text:'当前账户金额(元)',
        icon:'wallet'
    },
    {
        num:'0.00',
        text:'今日收入金额(元)',
        icon:'wallet'
    },
    {
        num:'0',
        text:'今日成交订单(笔)',
        icon:'wallet'
    },
    {
        num:'0',
        text:'昨日成交订单(笔)',
        icon:'wallet'
    },
    {
        num:'0',
        text:'今日卖出卡量(张)',
        icon:'wallet'
    },
    {
        num:'0.00',
        text:'今日卖出成本(元)',
        icon:'wallet'
    },
    {
        num:'0.00',
        text:'今日获得利润(元)',
        icon:'wallet'
    },
    {
        num:'0.00',
        text:'上次结算金额(元)',
        icon:'wallet'
    },
]
class Home extends Component {
    render(){
        return (
            <HomeStyled>
                <div className="home_container">
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={18}>
                        <List
                            grid={{ gutter: 16, column: 4 }}
                            dataSource={data}
                            renderItem={item => (
                            <List.Item>
                                <Card hoverable={true} className="item_box">
                                    <span className="num">{item.num}</span>
                                    <div className="bottom_box">
                                        <Icon type={item.icon} /> <span className="text">{item.text}</span>
                                    </div>
                                </Card>
                            </List.Item>
                            )}
                        />
                    </Col>
                    <Col className="right_box" span={6}>
                        <Card hoverable={true}>
                            <span className="title">今日支付通道分析</span>
                            <div className="amount_box">0.00</div>
                        </Card>    
                    </Col>
                    </Row>
                    <div className="echarts_box">
                        <p className="title">近期交易统计</p>
                        <Echarts/>
                    </div>
                    <div className="order_list_box">
                        <p className="title">最新订单信息</p>
                        <TableList/>
                    </div>
                </div>
            </HomeStyled>
        )
    }
}
export default Home