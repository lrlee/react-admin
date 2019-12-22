import React,{Component} from 'react';
import ReactEcharts from 'echarts-for-react';
const data = {
        xAxis: {
            type: 'category',
            axisLabel: {
                formatter: function (value, idx) {
                    var date = new Date(value);
                    return idx === 0 ? value : [date.getMonth() + 1, date.getDate()].join('-');
                }
            },
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
class _Echarts extends Component {
    render(){
        return (
            <ReactEcharts option={data}/>
        )
    }
}

export default _Echarts;