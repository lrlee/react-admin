import React,{Component} from 'react';
import ReactEcharts from 'echarts-for-react';

class Echarts extends Component {
    state = {
        data:{
            xAxis: {
                type: 'category',
                data:[],
                splitLine: {
                    show: false
                },
                boundaryGap: false
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [0.25, 0.5, 0.75, 1],
                type: 'line'
            }]
        }
    }
    componentWillReceiveProps (nextProps){
        if(nextProps.data!=this.props.data){
            this.setState({
                data:{
                    xAxis: {
                        type: 'category',
                        data:nextProps.data.time,
                        splitLine: {
                            show: false
                        },
                        boundaryGap: false
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: nextProps.data.value,
                        type: 'line'
                    }]
                }
            })
        }
    }
    render(){
        const {data} = this.state
        console.log(data,"data")
        return (
            data?<ReactEcharts option={data}/>:null
        )
    }
}

export default Echarts;