import React from 'react'
import { Link, withRouter } from "react-router-dom"
import { Menu, Icon } from 'antd'

import logo from "../../assets/images/logo.png"
import menuList from '../../config/menuConfig'
import './index.less'

const { SubMenu } = Menu
/**
 * 左侧导航的组件
 */

class LeftNav extends React.Component{

  /**
   * 动态生成左侧导航栏
   */
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname
    return menuList.map(item=>{
      if(!item.children){
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }else{
        //查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(cItem=>cItem.key===path)
        //如果存在，说明当前item的子列表需要打开
        if(cItem){
          this.openKey = item.key;
        }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  componentWillMount(){
    this.menuNodes = this.getMenuNodes(menuList)
  }
  
  render(){
    const path = this.props.location.pathname
    const openKey = this.openKey
    return(
      <div className="left-nav">
        <Link to='/' className="left-nav-header">
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>
        {/* 左侧导航栏 */}
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
        >
          { this.menuNodes }
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)
