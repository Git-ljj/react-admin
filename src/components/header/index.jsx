import React from 'react'
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd'

import LinkButton from '../link-button'
import {formateDate } from '../../utils/dataUtils.js'
import memoryUtils from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils.js'
import menuList from '../../config/menuConfig.js'
import {reqWeather} from '../../api'

import './index.less'

/**
 * 顶部导航的组件
 */
class Header extends React.Component{
  state = {
    currentTime:formateDate(Date.now()),  // 当前时间字符串
    weather:'',  // 天气的文本
  }
  /**
   * 获取当前时间
   */
  getTime = () => {
    //每隔1秒获取当前时间，并更新currentTime状态数据
    this.interval = setInterval(()=>{
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    },1000)
  }
  /**
   * 获取当前天气
   */
  getWeather = async() => {
    //调用接口请求异步获取数据
    const weather = await reqWeather('北京')
    // console.log(weather)
    //更新状态
    this.setState({
      weather,
    })
  }
  /**
   * 获取当前选中的标题
    */
   getTitle = () => {
    //获得当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      //如果当前item对象的key与path一样，item的title就是需要现实的title
      if(item.key === path){
        title = item.title
        //在所有子item中查找匹配的
      }else if(item.children){
        const cItem = item.children.find(cItem => cItem.key === path)
        //如果有值才说明有一个匹配的
        if(cItem){
          //取到他的title
          title = cItem.title
        }
      }
    })
    return title
   }
  /**
  * 退出登录
  */
   logout = () => {
    Modal.confirm({
      title: '确定退出吗?',
      onOk:()=>{
        console.log('OK');
        //删除当前登录的用户user
        storageUtils.getUser()
        memoryUtils.user = {}
        //并跳转至登陆页面
        this.props.history.replace('/login')
      },
    });
   }

  /**
   *   第一次render()之后执行一次
   * 一般在此执行异步操作：发ajax请求/启动定时器
   * */
  componentDidMount(){
    //获取当前时间
    this.getTime()
    //获取当前天气显示
    this.getWeather()
  }
  componentWillUnmount(){
    //清除定时器
    clearInterval(this.interval)
  }

  render(){
    const {currentTime, weather} = this.state;
    const username = memoryUtils.user.username
    const title = this.getTitle()
    return(
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <span>天气 : {weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
