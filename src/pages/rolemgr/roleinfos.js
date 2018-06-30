import React from 'react';
import CommonDAO from '@/component/commonDAO';
import Grid from '@/component/grid';
import PropTypes from 'prop-types';

const columns = [{
  title: '主键',
  dataIndex: 'id',
  key: 'name',
}, {
  title: '评论',
  dataIndex: 'detail',
  key: 'detail',
}, {
  title: '头像',
  dataIndex: 'headPic',
  key: 'headPic',
}, {
  title : '时间',
  dataIndex : 'commentedTime',
  key :'commentedTime'
}];


export default class Roleinfos extends React.Component{

  render(){
    const me = this;
    debugger
    return (
      <Grid  DAO='role' primaryKey={'id'} autoload={false} columns={columns}>
      </Grid>
    )
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
      store : store
    }
  }

}
