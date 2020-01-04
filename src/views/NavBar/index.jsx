import React, { Component } from 'react'
import styled from 'styled-components'
import { Link,withRouter} from 'react-router-dom'
import { Menu, Icon, Button } from 'antd'
import NavBarList from './data.js'
const { SubMenu } = Menu;
class NavBar extends Component {
    state={
        selectKey:this.props.location.pathname,
        openkey:''
    }
    componentDidMount(){
        //设置左边默认打开和选中的导航栏
        const {pathname}= this.props.location
        let path ='/'+ pathname.split('/')[1]
        this.setState({openKey:path})
    }
    componentWillReceiveProps(nextProps) {
        //当点击面包屑导航时，侧边栏要同步响应
        const pathname = nextProps.location.pathname
        if (this.props.location.pathname !== pathname) {
          this.setState({
            openKey:'/'+pathname.split("/")[1],
            selectKey: pathname,
          })
        }
    }
    componentDidUpdate(prevProps){
        console.log(prevProps,this.props,"props")
    }
    //展开收缩事件
    onOpenChange=k=>{
        console.log(k,"kk8888")
        if(k.length>1){
            console.log(k[1].split("/")[2],"kkk")
            this.setState({
                openKey:'/'+k[1].split("/")[1],
                selectKey:'/'+k[1].split("/")[2]
            })
        }else{
            this.setState({openkey:''})
        }
    }
    //切换导航栏
    menuClick=e=>{
        console.log(e.key,"key")
        this.setState({
            selectKey:e.key
        })
    }
    render() {
        console.log(this.props,"thisaaa")
        const {openKey,selectKey} = this.state
        console.log(openKey,selectKey,"openkey")
        return (
            <div style={{ width: 200 }}>
                <Menu
                    mode="inline"
                    openKeys={[openKey]}
                    selectedKeys={[selectKey]}
                    onClick={this.menuClick}
                    onOpenChange={this.onOpenChange}
                >
                    {
                        NavBarList.map(v=>{
                            return (
                                v.children?(
                                    <SubMenu
                                        key={v.path}
                                        title={
                                            <span>
                                                <Icon type={v.state.icon} />
                                                <span>{v.name}</span>
                                            </span>
                                        }
                                    >
                                        {
                                            v.children.map(val=>{
                                                return (
                                                    <Menu.Item key={v.path+val.path}><Link to={{
                                                        pathname:v.path+val.path,
                                                        state:val.state
                                                    }}>{val.name}</Link></Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                ):(
                                    <Menu.Item key={v.path}>
                                        <Icon type="pie-chart" />
                                        <Link to={{
                                            pathname:v.path,
                                            state:v.state
                                        }}>{v.name}</Link>
                                    </Menu.Item>
                                )
                            )
                        }
                           
                        )
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(NavBar) ;