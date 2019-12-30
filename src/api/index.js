/**
 * 要求：能根据接口文档定义接口请求
 * 
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是promise
 */
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

const BASE = ''
//登录 
// export function reqLogin(username,password) {
//   return ajax('./login', {username,password}, 'POST')
// }
export const reqLogin = (username,password) => ajax(BASE + '/login', {username,password}, 'POST')

//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

//json请求的接口数据
export const reqWeather = (city) => {
  return new Promise((resolve,reject)=>{
    const url =  `http://wthrcdn.etouch.cn/weather_mini?city=${city}`
    // console.log(url)
    //发送jsonp请求
    jsonp(url,{},(err,data)=>{
      console.log('jsonp()',err,data)
      if(!err && data.status === 1000){
        //去除需要的数据
        const weather = data.data.forecast[0].type
        resolve(weather)
      }else{
        message.error('获取天气信息失败')
      }
    })
  }) 
}
// reqWeather('北京')
