import React from 'react';
import {Helmet} from "react-helmet";
import {
  Avatar,
  Layout,
  Button,
  Row,
  Col,
  Form,
  Input,
  Menu,
  Icon
} from 'antd';
import {
  Router,
  Route,
  HashRouter,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';
const {Header, Footer, Sider, Content} = Layout;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {connect, Provider} from 'react-redux';
import PropTypes from 'prop-types';
import Dashboard from '@/pages/dashboard/dashboard';
import Liveinfo from '@/pages/livemgr/liveinfo';
import Videoinfos from '@/pages/videomgr/videoinfos';
import Userinfos from '@/pages/usermgr/userinfos';
import Roleinfos from '@/pages/rolemgr/roleinfos';

export default class Index extends React.Component {

  render() {

    const {history, location, match, staticContext} = this.props;
    const {store} = this.context;
    return (<Layout style={{
        height: '100vh'
      }}>
      <Layout>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>主页</title>
        </Helmet>
        <Header style={{
            fontSize: "20px",
            color: "white"
          }}>
          <Row type="flex" justify="space-between">
            <Col>
              享点医 后台管理系统
            </Col>
            <Col push={24}>
              <Avatar src="http://robinluo.top/images/LOGOxdy2.jpeg" style={{
                  marginRight: "4px"
                }} type="user"/>
              <span style={{
                  fontSize: "16px",
                  marginRight: "20px"
                }}>
                享点医管理员
              </span>

              <Link style={{
                  color: "white"
                }} to="/">
                <Icon type="logout"></Icon>
              </Link>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider style={{
              backgroundColor: '#fff'
            }}>
            <Menu mode="inline" defaultSelectedKeys={['2']}>
              {/*<Menu.Item key="1">
                <Link to="/main/dashboard">
                  <Icon type="dashboard"/>
                  <span className="nav-text">导航</span>
                </Link>
              </Menu.Item>*/
              }
              <Menu.Item key="2">
                <Link to="/main/liveinfo">
                  <Icon type="video-camera"/>
                  <span className="nav-text">直播管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/main/videoinfos">
                  <Icon type="camera"/>
                  <span className="nav-text">视频管理</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/main/userinfos">
                  <Icon type="user"/>
                  <span className="nav-text">用户管理</span>
                </Link>
              </Menu.Item>
              {/*<Menu.Item key="5">
                <Link to="/main/roleinfos">
                  <Icon type="profile"/>
                  <span className="nav-text">权限管理</span>
                </Link>
              </Menu.Item>*/
              }
            </Menu>
          </Sider>
          <Content style={{
              backgroundColor: '#f0f2f5'
            }}>
            <Layout style={{
                padding: "20px",
                height: '100%'
              }}>
              <Content style={{
                  backgroundColor: '#fff',
                  padding: "15px"
                }}>
                <Route path="/main" render={(props) => {
                    return <Provider store={store}><Liveinfo {...props}/></Provider>
                  }} exact={true}/>
                <Route path="/main/liveinfo" render={(props) => {
                    return <Provider store={store}><Liveinfo {...props}/></Provider>
                  }} exact={true}/> {/*<Route path="/main/dashboard" render={(props) => {
                    return <Provider store={store}><Dashboard {...props}/></Provider>
                  }}/>*/
                }
                <Route path="/main/videoinfos" render={(props) => {
                    return <Provider store={store}><Videoinfos {...props}/></Provider>
                  }}/>

                <Route path="/main/userinfos" render={(props) => {
                    return <Provider store={store}><Userinfos {...props}/></Provider>
                  }}/> {/*
                  <Route path="/main/roleinfos" render={(props) => {
                    return <Provider store={store}><Roleinfos {...props}/></Provider>
                  }}/>*/
                }
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
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
