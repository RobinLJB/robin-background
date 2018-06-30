import React from 'react';
import CommonDAO from '@/component/commonDAO';
import Grid from '@/component/grid';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
  Modal,
  Popconfirm,
  message,
  Form,
  Input
} from 'antd';
const FormItem = Form.Item;

const columns = [
  {
    title: '用户昵称',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '头像',
    dataIndex: 'headImgUrl',
    key: 'headImgUrl',
    render: url => <img style={{
          width: '53px',
          height: '53px'
        }} src={url}/>
  }, {
    title: 'openid',
    dataIndex: 'openid',
    key: 'openid'
  }
];

class UserSearchForm extends React.Component {

  render() {
    const {getFieldDecorator} = this.props.form;
    return (<Form>
      <FormItem labelCol={{
          xs: {
            span: 24
          },
          sm: {
            span: 6
          }
        }} wrapperCol={{
          xs: {
            span: 24
          },
          sm: {
            span: 15
          }
        }} label="用户昵称">
        {
          getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入用户昵称'
              }
            ]
          })(<Input/>)
        }
      </FormItem>
    </Form>)
  }
}
const SearchForm = Form.create()(UserSearchForm);
class UserGrid extends Grid {

  renderSearchForm = function() {
    return(
      <SearchForm ref="searchForm" ></SearchForm>
    )
  }.bind(this)
}
export default class Userinfos extends React.Component {

  render() {
    const me = this;
    return (<UserGrid DAO='user' primaryKey={'id'} autoload={false} columns={columns} isAdd={false} isDelete={false} isUpdate={false}></UserGrid>)
  }

  static contextTypes = {
    store: PropTypes.object
  };

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
