import React, { Component } from 'react'
import { Input, Button    } from 'antd';
import '../less/phonevalidate.less'

export default class Validate extends React.Component {
  constructor(props) {
    super(props);

    const value = this.props.value || '';
    this.state = {
      value: value,
      sendCodeTime: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { value } = nextProps;
    if (props.value !== value) {
      this.setState({
         value,
      });
    }
  }
  handleChange = (e,callback) => {
    const value = e.target.value.trim();
    this.setState({ value });
    if (callback) {
      callback( e.target.value.trim())
    }
    this.triggerChange(value);
  }
  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }
  TimeClick =(callback)=>{
      if(!this.props.tel){
         this.setState({sendCodeTime:60})
      }else{
        this.SendCode();
        if(callback){
          callback()
        }
      }
  }

  SendCode = () => {
    const self = this;
    this.setState({
      sendCodeTime: 60
    });
    const sendCodeTimeAction = setInterval(() => {
      let { sendCodeTime } = this.state;
      if (sendCodeTime === 1) {
        clearInterval(sendCodeTimeAction);
      }
      sendCodeTime -= 1;
      self.setState({
        sendCodeTime
      });
    }, 1000);
  }
  render() {
    const { addonBefore,addonAfter,defaultValue ,placeholder,labelwidth,tel,telflag} = this.props
    const { sendCodeTime } =  this.state
    return (
       <div className='counttime'>
         <Input
            value={this.state.value}
            onChange={(e) => { this.handleChange(e, this.props.onChange)}}
            {...this.props}
            addonBefore={
              <div className="lable" style={{'width':'80px'}}>短信验证码</div>
            }
            addonAfter={
              <Button
                className='btnafter'
                onClick={()=>{this.TimeClick(this.props.onClick)}}
                disabled={telflag || sendCodeTime > 1}
              >
                {sendCodeTime > 1 ? <span>重新获取({sendCodeTime}s)</span> : '获取验证码'}
              </Button>
            }
            style={{ width: '100%' }}
          />
       </div>
    );
  }
}
