import React from 'react'
import {Redirect} from 'react-router-dom'
import {
  Form,
  Icon,
  Input,
  Button,
  message
} from 'antd'
import './login.less'
import logo from '../../assets/images/logo.png'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils.js'

/**
 * Login组件：用户登录界面
 */
class Login extends React.Component{
  /**
   * 密码自定义验证
   */
  validatePwd = (rule, value, callback) => {
    if(!value){
      callback('密码不能为空')
    }else if(value.length<4){
      callback('密码不能小于4位')
    }else if(value.length>12){
      callback('密码不能大于12位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密码必须由字母、数字或下划线组成')
    }else{
      callback()
    }

    // callback()  不传东西，表示验证通过
    // callback('XXXX')  验证失败，并指定提示的内容
  }

  /**
   * 用户登录
   */
  handleSubmit = (event) => {
    //阻止事件默认行为
    event.preventDefault();
    // const {form} = this.props;  // 得到form对象
    // const values = form.getFieldsValue()  // 得到表单项的输入数据

    // 对所有表单字段进行验证
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        //当所有验证通过
        // console.log('Received values of form: ', values);
        const {username,password} = values
        const result = await reqLogin(username,password)
        // console.log('请求成功',response.data=result)
        if(result.status===0){
          //提示登录成功
          message.success('登陆成功')
          //保存user
          const user = result.data
          memoryUtils.user = user //保存在内存中
          storageUtils.saveUser(user) //保存在local中

          //跳转到管理界面,不需要在回退回来，所以不用push,而用replace
          this.props.history.replace('/')
        }else{
          //提示登陆失败
          message.error(result.msg)
        }
      }else{
        //对输入字段验证失败时，提示信息
        message.warning('输入不规范、登录失败！')
      }
    });
  }


  render(){
    //如果用户已经登录，自动跳转至后台管理界面
    const user = memoryUtils.user
    if(user && user._id){
      return <Redirect to='/' />
    }
    
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>Admin 后台管理系统</h1>         
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                // 声明式验证：直接使用别人定义好的验证规则进行验证
                rules: [  
                  { required: true, whitespace:true, message: '用户名不能为空' },
                  { min: 4, message: '用户名不能小于4位' },
                  { max: 12, message: '用户名不能大于12位' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须由字母、数字或下划线组成' },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                // 自定义验证
                rules: [  
                  {
                    validator: this.validatePwd,
                  }
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

/**
 * 包装Form组件生成一个新的组件：Form(Login)
 * 新组件会向Form组件传递一个强大的对象属性：form
 * (相当于该函数传入一个对象属性，上文中 "const {form} = this.props" 就是源于此！！！ )
 */
export default Form.create()(Login)


/**
 * 1、高阶函数：
 *    1)、一类特别的函数：
 *        a.接收函数类型的参数
 *        b.返回值是函数
 * 2、高阶组件：
 *    1)、本质就是一个函数
 *    2)、接受一个组件(被包裹组件)，返回一个新的组件(包装组件)，包装组件会向被包装组件传入特定属性
 *    3)、作用：扩展组件功能
 *    4)、高阶组件也是一个高阶函数：接收一个组件函数，返回一个新的组件函数
 */