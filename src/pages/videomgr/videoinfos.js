import React from 'react';
import CommonDAO from '@/component/commonDAO';
import Grid from '@/component/grid';
import PropTypes from 'prop-types';
import TinyMCEInput from 'react-tinymce-input';

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
    title: '视频名称',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '视频封面',
    dataIndex: 'poster',
    key: 'poster',
    render: poster => <img src={poster} style={{
          width: '70px',
          height: '70px'
        }}/>
  }, {
    title: '点赞数',
    dataIndex: 'thumbUp',
    key: 'thumbUp'
  }, {
    title: '观看数',
    dataIndex: 'audience',
    key: 'audience'
  }
];

class VideoSearchForm extends React.Component {

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
        }} label="视频名称">
        {
          getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入视频名称'
              }
            ]
          })(<Input/>)
        }
      </FormItem>
    </Form>)
  }
}
const SearchForm = Form.create()(VideoSearchForm);

class VideoAddForm extends React.Component {

  render() {
    const {form} = this.props;
    const {getFieldDecorator} = form;
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
        }} label="视频名称">
        {
          getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入视频名称'
              }
            ]
          })(<Input/>)
        }
      </FormItem>
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
        }} label="视频封面链接">
        {
          getFieldDecorator('poster', {
            rules: [
              {
                required: true,
                message: '请输入视频封面链接'
              }
            ]
          })(<Input />)
        }
      </FormItem>
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
        }} label="视频播放链接">
        {
          getFieldDecorator('url', {
            rules: [
              {
                required: true,
                message: '请输入视频播放链接'
              }
            ]
          })(<Input />)
        }
      </FormItem>

      <FormItem labelCol={{
          sm: {
            span: 6
          },
          md: {
            span: 6
          }
        }} wrapperCol={{
          sm: {
            span: 20,
            offset: 2
          },
          md: {
            span: 6,
            offset: 0
          }
        }} label="点赞数">
        {getFieldDecorator('thumbUp')(<Input disabled={false}/>)}
      </FormItem>
      <FormItem labelCol={{
          sm: {
            span: 6
          },
          md: {
            span: 6
          }
        }} wrapperCol={{
          sm: {
            span: 20,
            offset: 2
          },
          md: {
            span: 6,
            offset: 0
          }
        }} label="观众数">
        {getFieldDecorator('audience')(<Input disabled={false}/>)}
      </FormItem>

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
        }} label="视频主题">
        {

          getFieldDecorator('subject', {
            initialValue: this.props.values
              ? this.props.values.subject
              : null,
            rules: [
              {
                required: false,
                message: '请输入视频主题'
              }
            ]
          })(<TinyMCEInput tinymceConfig={{
              language: "zh_CN",
              plugins: 'autolink lists print preview',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
            }}/>)
        }
      </FormItem>
    </Form>)
  }
}
const AddForm = Form.create()(VideoAddForm);

class VideoUpdateForm extends React.Component {

  render() {
    const {getFieldDecorator} = this.props.form;
    return (<Form>
      {getFieldDecorator('id', {})(<Input type="hidden"/>)}
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
        }} label="视频名称">
        {
          getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入视频名称'
              }
            ]
          })(<Input/>)
        }
      </FormItem>
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
        }} label="视频封面链接">
        {
          getFieldDecorator('poster', {
            rules: [
              {
                required: true,
                message: '请输入视频封面链接'
              }
            ]
          })(<Input/>)
        }
      </FormItem>
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
        }} label="视频播放链接">
        {
          getFieldDecorator('url', {
            rules: [
              {
                required: true,
                message: '请输入视频播放链接'
              }
            ]
          })(<Input/>)
        }
      </FormItem>
      <FormItem labelCol={{
          sm: {
            span: 6
          },
          md: {
            span: 6
          }
        }} wrapperCol={{
          sm: {
            span: 20,
            offset: 2
          },
          md: {
            span: 6,
            offset: 0
          }
        }} label="点赞数">
        {getFieldDecorator('thumbUp')(<Input disabled={false}/>)}
      </FormItem>
      <FormItem labelCol={{
          sm: {
            span: 6
          },
          md: {
            span: 6
          }
        }} wrapperCol={{
          sm: {
            span: 20,
            offset: 2
          },
          md: {
            span: 6,
            offset: 0
          }
        }} label="观众数">
        {getFieldDecorator('audience')(<Input disabled={false}/>)}
      </FormItem>

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
        }} label="视频主题">
        {

          getFieldDecorator('subject', {
            initialValue: this.props.values
              ? this.props.values.subject
              : null,
            rules: [
              {
                required: false,
                message: '请输入视频主题'
              }
            ]
          })(<TinyMCEInput tinymceConfig={{
              language: "zh_CN",
              resize : true,
              height : 200,
              plugins: 'autolink lists print preview',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
            }}/>)
        }
      </FormItem>
    </Form>)
  }
  componentDidMount() {
    let {form, values} = this.props;
    form.setFieldsValue(values);

  }
}
const UpdateForm = Form.create()(VideoUpdateForm);

class VideoGrid extends Grid {

  renderAddForm = function() {
    return (<AddForm ref="addForm"></AddForm>)
  }.bind(this)

  renderSearchForm = function() {
    return (<SearchForm ref="searchForm"></SearchForm>)
  }.bind(this)

  renderUpdateForm = function() {
    let values = this.state.selectedRecord
    return (<UpdateForm ref="updateForm" values={values}></UpdateForm>)
  }.bind(this)

}

export default class Videoinfos extends React.Component {

  render() {
    const me = this;
    return (<VideoGrid DAO='channel' primaryKey={'id'} autoload={false} columns={columns}></VideoGrid>)
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
