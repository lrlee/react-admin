import React,{Component} from 'react'
import {Route,Redirect,Switch,withRouter,BrowserRouter} from 'react-router-dom'
import Loadable from 'react-loadable'
import { ConfigProvider} from 'antd'
import Loading from '@/views/Loading'
const Home = Loadable({
    loader:()=>import('@/views/Home'),
    loading:Loading
})
const Store = Loadable({
    loader:()=>import('@/views/Store'),
    loading:Loading
})
// export const router = [
//     {path:'/',component:Home,exact:true}
// ]
//Switch标签：有此标签时，则其中的route在路径相同的情况下，只匹配第一个，可以避免重复匹配
class Routes extends Component {
    render(){
        return (
            <ConfigProvider>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/store' component={Store} />
                    </Switch>
            </ConfigProvider>
        )
    }
}

export default Routes;