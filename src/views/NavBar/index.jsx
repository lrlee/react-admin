import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Menu, Icon, Button } from 'antd'
import NavBarList from './index.js'
const { SubMenu } = Menu;
class NavBar extends Component {
    componentDidMount(){
        console.log(NavBarList,"hhhh")
    }
    render() {
        return (
            <div style={{ width: 200 }}>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    {
                        NavBarList.map(v=>{
                            return (
                                v.children?(
                                    <SubMenu
                                        key={v.path}
                                        title={
                                            <span>
                                                <Icon type="mail" />
                                                <span>{v.name}</span>
                                            </span>
                                        }
                                    >
                                        {
                                            v.children.map(val=>{
                                                return (
                                                    <Menu.Item key={v.path+val.path}><Link to={v.path+val.path}>{val.name}</Link></Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                ):(
                                    <Menu.Item key={v.path}>
                                        <Icon type="pie-chart" />
                                        <Link to={v.path}>{v.name}</Link>
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

export default NavBar;