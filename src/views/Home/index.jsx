import React,{Component} from 'react';
import styled from 'styled-components';
import {List,Card,Icon,Row,Col,message} from 'antd';
import Echarts from '@/views/Echarts';
import TableList from '@/components/table'
import ajax from '@/utils/ajax'
import {connect} from 'react-redux'
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
class Home extends Component {
    state = {
        orderList:[],
        echartsData:null,
        columns:[
            {
                title: '订单号',
                dataIndex: 'order_code'
            },
            {
                title: '商品名称',
                dataIndex: 'goods_name'
            },
            { title: '交易金额', dataIndex: 'amount' },
            { title: '下单时间', dataIndex: 'trading_time'},
            { title: '状态', dataIndex: 'take_status' },
            { title: '支付通道', dataIndex: 'pay_type' }
        ],
        data:[
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
    }
    componentDidMount(){
        this.getStatisticalData()
        this.getOrderList()
    }
    getOrderList(){
        ajax({
            url:'orderController/getOrderList.do',
            params:{
                bussinessId:this.props.userInfo.businessId
            }
        }).then(res=>{
            if(res.data.result){
                this.setState({
                    orderList:res.data.data
                })
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })
    }
    getStatisticalData(){
        ajax({
            url:'/businessController/getStatistics.do',
            params:{
                bussinessId:this.props.userInfo.businessId
            }
        }).then(res=>{
            if(res.data.result){
               const statisticalData = [
                    {
                        num:res.data.data.amount,
                        text:'当前账户金额(元)',
                        icon:'wallet'
                    },
                    {
                        num:res.data.data.todayProfit,
                        text:'今日收入金额(元)',
                        icon:'wallet'
                    },
                    {
                        num:res.data.data.todayOrders,
                        text:'今日成交订单(笔)',
                        icon:'wallet'
                    },
                    {
                        num:res.data.data.yestodayOrders,
                        text:'昨日成交订单(笔)',
                        icon:'wallet'
                    },
                    {
                        num:res.data.data.todayCards,
                        text:'今日卖出卡量(张)',
                        icon:'wallet'
                    },
                    {
                        num:res.data.data.todayCost,
                        text:'今日卖出成本(元)',
                        icon:'wallet'
                    },
                    {
                        num:res.data.data.todayProfit,
                        text:'今日获得利润(元)',
                        icon:'wallet'
                    },
                    {
                        num:res.data.data.LastCash,
                        text:'上次结算金额(元)',
                        icon:'wallet'
                    }
                ]
               this.setState({data:statisticalData,echartsData:res.data.data.latelyTrading})
            }else{
                message.error(res.data.msg)
            }
        }).catch(err=>{
            message.error(err.data.msg)
        })
    }
    render(){
        const {data,echartsData,orderList,columns} = this.state
        return (
            <HomeStyled>
                <div className="home_container">
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={24}>
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
                    {/* <Col className="right_box" span={6}>
                        <Card hoverable={true}>
                            <span className="title">今日支付通道分析</span>
                            <div className="amount_box">0.00</div>
                        </Card>    
                    </Col> */}
                    </Row>
                    <div className="echarts_box">
                        <p className="title">近期交易统计</p>
                        <Echarts data={echartsData} />
                    </div>
                    <div className="order_list_box">
                        <p className="title">最新订单信息</p>
                        <TableList columns={columns} data={orderList}/>
                    </div>
                </div>
            </HomeStyled>
        )
    }
}

const mapStateToProps = state=>({
    userInfo:state.user
})
export default connect(mapStateToProps,null)(Home)