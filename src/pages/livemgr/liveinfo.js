import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
  Modal,
  Popconfirm,
  message,
  Form,
  Input,
  Col
} from 'antd';
const FormItem = Form.Item;
import QRcode from 'qrcode.react';
import TinyMCEInput from 'react-tinymce-input';
import CommonDAO from '@/component/commonDAO';

class LiveinfoForm extends React.Component {

  render() {
    const {getFieldDecorator} = this.props.form;
    return (<Form >
      <FormItem>
        {getFieldDecorator('id',)(<Input type="hidden"/>)}
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
            span: 15,
            offset: 0
          }
        }} label="直播标题">
        {
          getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入直播标题'
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
        }} label="直播密码">
        {
          getFieldDecorator('password', {
            rules: [
              {
                message: '可以设置直播密码或留空'
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
            span: 15,
            offset: 0
          }
        }} label="直播二维码">{getFieldDecorator('qrcode', {initialValue: "www.robinluo.top"})(<QRcode/>)}

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
            span: 15,
            offset: 0
          }
        }} label="直播封面地址">
        {
          getFieldDecorator('poster', {
            rules: [
              {
                required: true,
                message: '请输入直播封面链接'
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
            span: 15,
            offset: 0
          }
        }} label="直播主题">
        {
          getFieldDecorator('subject')(<TinyMCEInput tinymceConfig={{
              language: "zh_CN",
              resize : true,
              height : 400,
              plugins: 'autolink lists print preview',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
            }}/>)

        }
      </FormItem>
    </Form>)
  }

}
const LiveForm = Form.create()(LiveinfoForm);

export default class Liveinfo extends Component {

  render() {
    return (<div>
      <div>
        <Button type="primary" icon="check" onClick={this.onUpdateClick}>
          保存
        </Button>
      </div>
      <LiveForm ref="liveForm"></LiveForm>
      <CommonDAO ref='dao' DAO="liveInfo" primaryKey={['id']}></CommonDAO>
    </div>)
  }

  onUpdateClick = function() {
    let values = this.refs.liveForm.getFieldsValue();
    delete values.qrcode;
    this.refs.dao.put(values.id, values, (data) => {
      this.reload();
      message.success("修改成功");
    }, (error) => {
      this.reload();
      message.error("修改失败");
    })
  }.bind(this)

  reload = function() {
    const params = {
      "type": 1
    }
    this.refs.dao.get(params, (data) => {
      let d = data.data[0];
      let values = {};
      //过滤null值为undefined
      for (let f in d) {
        if (d[f] === null) {
          values[f] = undefined;
        } else {
          values[f] = d[f];
        }
      }
      this.refs.liveForm.setFieldsValue(values);
    }, (error) => {
      message.error("加载失败");
    })
  }.bind(this)

  componentDidMount() {
    this.reload();
  }

  static contextTypes = {
    store: PropTypes.object
  }; //指定子context的对象结构

  //构建子组件用到的context
  static childContextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  };

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
