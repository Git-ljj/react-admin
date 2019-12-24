/**
 * 入口js
 */

// 引入第三方模块 
import React from 'react'
import ReactDOM from 'react-dom'
// import 'antd/dist/antd.css'
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'

//引入自定义模块
import App from './App'

//读取local中的user，保存在内存中
const user = storageUtils.getUser()
memoryUtils.user = user

//将App组件标签渲染到index页面的div上
ReactDOM.render(<App />,document.getElementById('root'))