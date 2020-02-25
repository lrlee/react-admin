import React,{Component} from 'react';
import {Table} from 'antd'

class TableList extends Component {
    render(){
        return (
            <Table columns={this.props.columns} dataSource={this.props.data}  />
        )
    }
}

export default TableList;