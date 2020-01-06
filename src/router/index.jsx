import React,{Component} from 'react'
import {Route,Switch,withRouter,BrowserRouter} from 'react-router-dom'
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
const LoginLog = Loadable({
    loader:()=>import('@/views/Store/log'),
    loading:Loading
})
const UserSettings = Loadable({
    loader:()=>import('@/views/Store/settings'),
    loading:Loading
})
const ResetPassword = Loadable({
    loader:()=>import("@/views/Store/resetPassword"),
    loading:Loading
})
const StoreLinks = Loadable({
    loader:()=>import('@/views/Store/links'),
    loading:Loading
})
const Sort = Loadable({
    loader:()=>import("@/views/goods/sort"),
    loading:Loading
})
const AddGoods = Loadable({
    loader:()=>import("@/views/goods/add"),
    loading:Loading
})
const GoodsList = Loadable({
    loader:()=>import("@/views/goods/list"),
    loading:Loading
})
const RecycleList = Loadable({
    loader:()=>import('@/views/goods/recycle'),
    loading:Loading
})
const VirtualCardList = Loadable({
    loader:()=>import("@/views/virtualCard/list"),
    loading:Loading
})
const AddCard = Loadable({
    loader:()=>import("@/views/virtualCard/add"),
    loading:Loading
})
const RecycleCard = Loadable({
    loader:()=>import("@/views/virtualCard/recycle"),
    loading:Loading
})
const OrderList = Loadable({
    loader:()=>import("@/views/order/list"),
    loading:Loading
})
const RevenueAnalysis = Loadable({
    loader:()=>import('@/views/order/revenue'),
    loading:Loading
})
const ApplyWithdraw = Loadable({
    loader:()=>import("@/views/withdraw/apply"),
    loading:Loading
})
const WithdrawList = Loadable({
    loader:()=>import('@/views/withdraw/list'),
    loading:Loading
})
//Switch标签：有此标签时，则其中的route在路径相同的情况下，只匹配第一个，可以避免重复匹配
class Routes extends Component {
    render(){
        return (
            <ConfigProvider>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/store' component={Store} />
                    <Route exact path='/store/log' component={LoginLog}/>
                    <Route exact path='/store/edit' component={UserSettings}/>
                    <Route exact path='/store/resetPassword' component={ResetPassword}/>
                    <Route exact path='/store/link' component ={StoreLinks}/>
                    <Route exact path='/goods/sort' component={Sort}/>
                    <Route exact path='/goods/add' component={AddGoods}/>
                    <Route exact path='/goods/list' component={GoodsList}/>
                    <Route exact path='/goods/recycle' component = {RecycleList}/>
                    <Route exact path='/card/list' component={VirtualCardList}/>
                    <Route exact path='/card/add' component={AddCard}/>
                    <Route exact path='/card/recycle' component={RecycleCard}/>
                    <Route exact path='/order/list' component={OrderList}/>
                    <Route exact path='/order/analysis' component={RevenueAnalysis}/>
                    <Route exact path='/withdraw/apply' component={ApplyWithdraw}/>
                    <Route exact path='/withdraw/list' component={WithdrawList}/>
                </Switch>
            </ConfigProvider>
        )
    }
}

export default Routes;