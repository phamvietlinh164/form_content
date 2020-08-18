import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './Login.css';
// import axios from 'axios';

import { connect } from 'react-redux';
// import { loginZabbix } from "../../store/Monitor/monitorActions";
// import { saveFieldLogin } from "../../store/Login/loginActions";
// import { actIsLoggin } from '../actions/index';
// import { Redirect } from 'react-router-dom';





class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // this.props.loginZabbix()
      }
    });
  };

  render() {

    // if (this.props.isLoggin) {
    //   // var location = this.props.location;
    //   return <Redirect to={{
    //     pathname: '/',
    //     state: {
    //       // from: location
    //     }
    //   }} />
    // }



    const { getFieldDecorator } = this.props.form;
    return (

      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1>abc</h1>
        <br />
        <br />
        <br />
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
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
            Log in
          </Button>

        </Form.Item>
      </Form>

    );
  }
}

// const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);
const Login = Form.create({
  mapPropsToFields: props => {
    const { login } = props;

    return {
      username: Form.createFormField(login.username),
      password: Form.createFormField(login.password)
    }
  },
  onFieldsChange(props, fields) {
    props.onSaveFieldLogin(fields);

  }
})(NormalLoginForm);

const mapStateToProps = state => {
  const { login } = state
  return {
    login
  };
};

const mapDispatchToProps = dispatch => ({
  // checkZabbixToken: (data) => {
  //   dispatch(checkZabbixToken(data));
  // },
  // loginZabbix: () => {
  //   dispatch(loginZabbix());
  // },
  // onSaveFieldLogin: fields => {
  //   dispatch(saveFieldLogin(fields));
  // },

});



export default connect(mapStateToProps, mapDispatchToProps)(Login)


