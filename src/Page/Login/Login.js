import React from 'react';
import { Form, Input, Button } from 'antd';
import './Login.css';
import axios from 'axios';
import { currentEnv } from "../../configs";

import { connect } from 'react-redux';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


class Login extends React.Component {
  onFinish = values => {
    // console.log('Success:', values);
    axios.post(`${currentEnv.DOMAIN_URL}/login`, {
      username: values.username,
      password: values.password
    })
      .then(response => {
        // console.log(response.data)
        if (response.data) {
          localStorage.setItem('token', response.data);
          this.props.history.push('/')
        } else {
          alert('Wrong username or password!')
        }
      })
      .catch(error => {
        console.log(error);
        alert('Some error have happened!')
      });
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  componentDidMount = () => {
    if (this.props.location.state) {
      if (this.props.location.state.message) {
        alert(this.props.location.state.message)
      }
    }
  }


  render() {
    return (
      <React.Fragment>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>


          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
        </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
};


const mapStateToProps = state => {
  const { login } = state
  return {
    login
  };
};

const mapDispatchToProps = dispatch => ({
  checkZabbixToken: (data) => {
    // dispatch(checkZabbixToken(data));
  },
  loginZabbix: () => {
    // dispatch(loginZabbix());
  },
  onSaveFieldLogin: fields => {
    // dispatch(saveFieldLogin(fields));
  },

});



export default connect(mapStateToProps, mapDispatchToProps)(Login)


