import React,{Component} from 'react';
import {Table} from 'antd'
const columns = [
  {
    title: '订单号',
    dataIndex: 'num',
    key: 'num',
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
  },
  { title: '交易金额', dataIndex: 'amount',key:'amount' },
  { title: '下单时间', dataIndex: 'date',key:'date'},
  { title: '状态', dataIndex: 'status',key:'status' },
  { title: '支付通道', dataIndex: 'payway', key: 'payway' }
];
class TableList extends Component {
    render(){
        return (
            <Table columns={columns} dataSource={this.props.data}  />
        )
    }
}

export default TableList;