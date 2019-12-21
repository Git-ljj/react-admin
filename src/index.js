/**
 * 入口js
 */

// 引入第三方模块 
import React from 'react'
import ReactDOM from 'react-dom'
// import 'antd/dist/antd.css'

//引入自定义模块
import App from './App'


//将App组件标签渲染到index页面的div上
ReactDOM.render(<App />,document.getElementById('root'))