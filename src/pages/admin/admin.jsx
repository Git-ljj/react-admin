import React from 'react'
import memoryUtils from '../../utils/memoryUtils.js'
import {Redirect, Route, Switch} from 'react-router-dom'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

// 二级路由
import Category from "../category/category";
import Bar  from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import Home from "../home/home";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";

const { Sider, Footer, Content } = Layout

// 后台管理的界面
export default class Admin extends React.Component{
  render(){
    const user = memoryUtils.user
    //如果内存中没有存储user ===> 当前没有登陆
    if(!user || !user._id){
      //自动跳转到登录（在render()中）
      return <Redirect to='/login'/>
    }
    return(
      <Layout style={{height:'100%'}}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{margin:'20px', background:"#fff"}}>
            <Switch>
              <Route path='/home' component={Home} /> 
              <Route path='/category' component={Category} /> 
              <Route path='/product' component={Product} /> 
              <Route path='/role' component={Role} /> 
              <Route path='/user' component={User} /> 
              <Route path='/charts/bar' component={Bar} /> 
              <Route path='/charts/line' component={Line} /> 
              <Route path='/charts/pie/' component={Pie} /> 
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{textAlign:'center'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}