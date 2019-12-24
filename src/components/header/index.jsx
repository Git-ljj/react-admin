import React from 'react'
import './index.less'

/**
 * 顶部导航的组件
 */

class Header extends React.Component{
  render(){
    return(
      <div className="header">
        <div className="header-top">
          <span>欢迎，admin</span>
          <a href="javascript:">退出</a>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">首页</div>
          <div className="header-bottom-right">
            <span>2019-5-12 10：12：32</span>
            <img src="" alt="icon"/>
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
