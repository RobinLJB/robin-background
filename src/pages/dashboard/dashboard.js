import React from "react";
import { Table, Icon, Divider, Row, Col  } from 'antd';
import PropTypes from 'prop-types';


export default class Dashboard extends React.Component{

  render(){
    const me = this;
    return (
        <div style = {{  color : 'white' }}>

        </div>
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
