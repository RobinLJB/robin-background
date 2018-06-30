import React from 'react';
import {Helmet} from "react-helmet";
import {
  Layout,
  Button,
  Form,
  Input,
  Icon,
  message
} from 'antd';
const {Header, Footer, Sider, Content} = Layout;
const FormItem = Form.Item;
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class UserLoginForm extends React.Component {

  handleLogin = function(event) {
    const form = this.props.form;
    let values = form.getFieldsValue();
    if ("admin" != values.username || "admin" != values.password) {
       form.setFields({
         password: {
                errors: [new Error("请输入正确的账号密码")],
              },
       });
       event.preventDefault();
    }
  }.bind(this)

  render() {
    const {getFieldDecorator} = this.props.form;
    return (<Form style={{
        width: '80vw',
        maxWidth: '700px',
        padding: '25px',
        backgroundColor: '#fff'
      }} className="login-form">
      <FormItem hasFeedback={true} style={{
          maxWidth: '400px'
        }}>
        {
          getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请输入用户账号'
              }
            ]
          })(<Input prefix={<Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="Username"/>)
        }
      </FormItem>
      <FormItem hasFeedback={true} style={{
          maxWidth: '400px'
        }}>
        {
          getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入用户密码'
              }
            ]
          })(<Input prefix={<Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>} type="password" placeholder="Password"/>)
        }
      </FormItem>
      <Link to="/main" onClick={this.handleLogin}>
        <Button type="primary" style={{
            maxWidth: '250px',
            width: '100%'
          }} className="login-form-button">
          登录
        </Button>
      </Link>
    </Form>)
  }
}

const LoginForm = Form.create()(UserLoginForm);

export default class Login extends React.Component {

  render() {
    const me = this;
    return (<Layout style={{
        height: '100vh'
      }}>
      <Helmet>
        <meta charSet="utf-8"></meta>
        <title>登录</title>
      </Helmet>
      <Header style={{
          fontSize: "20px",
          color: "white"
        }}>享点医 后台管理系统
      </Header>
      <Content style={{
          margin: "15vh auto"
        }}>
        <LoginForm/>
      </Content>
      <Footer></Footer>
    </Layout>)
  }

  static contextTypes = {
    store: PropTypes.object
  }
  //指定子context的对象结构
  static childContextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  };
  //构建子组件用到的context
  getChildContext() {
    const {history, location, match, staticContext} = this.props;
    const {store} = this.context;
    return {
      router: {
        history: history,
        route: {
          location: location,
          match: match,
          staticContext: staticContext
        }
      },
      store: store
    }
  }
}
