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
const data = [
    {
        key:1,
        num:'T191214223919707468',
        name:'23244242（2张）',
        amount:'40.00',
        date:'12/14 22:39:19',
        status:'待支付',
        payway:'支付宝支付'
    },
    {
        key:1,
        num:'T191214223919707468',
        name:'23244242（2张）',
        amount:'40.00',
        date:'12/14 22:39:19',
        status:'待支付',
        payway:'支付宝支付'
    },
    {
        key:1,
        num:'T191214223919707468',
        name:'23244242（2张）',
        amount:'40.00',
        date:'12/14 22:39:19',
        status:'待支付',
        payway:'支付宝支付'
    },
    {
        key:1,
        num:'T191214223919707468',
        name:'23244242（2张）',
        amount:'40.00',
        date:'12/14 22:39:19',
        status:'待支付',
        payway:'支付宝支付'
    }
]
class TableList extends Component {
    state={
        tableData:[]
    }
    getTableData(){

    }
    render(){
        return (
            <Table columns={columns} dataSource={data}  />
        )
    }
}

export default TableList;