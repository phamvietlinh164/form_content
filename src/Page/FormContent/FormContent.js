import React from 'react';
import { Row, Col } from 'antd';
import { connect } from "react-redux";
import { formUploadItem } from "./form-item-config";
import { Redirect } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import UploadContent from "../../components/UploadContent/UploadContent";
import Select from "../../components/Select/Select";
import { currentEnv } from "../../configs";
import "./FormContent.css"
import axios from "axios";

class FormContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hospital: localStorage.getItem('hospital') || "dkkvangiang",
      isLogin: true
    }
  }


  componentDidMount = () => {
    axios.post(`${currentEnv.DOMAIN_URL}/checkAuth`, {
      token: localStorage.getItem('token')
    })
      .then(response => {
        this.setState({
          isLogin: response.data.isLogin
        })
      })
      .catch(error => {
        this.setState({
          isLogin: false
        })
      });
  }

  changeHospital = (value) => {
    localStorage.setItem('hospital', value);
    this.setState({
      hospital: value
    })
    if (localStorage.getItem('needRefresh') === 'true') {
      localStorage.setItem('needRefresh', 'false')
      window.location.reload();
    }
    // this.props.history.push('login')
  }

  // onFinish = values => {
  //   console.log('Success:', values);
  // };

  // onFinishFailed = errorInfo => {
  //   console.log('Failed:', errorInfo);
  // };



  showAvatar = () => {
    const result = formUploadItem.map((item, index) => {
      if (item.fieldName === 'content') {
        return <Col xs={24} sm={12} md={8} lg={4} key={index}>
          <UploadContent
            label={item.label}
            name={item.name}
            hospital={this.state.hospital}
            type={item.type}
            fieldName={item.fieldName}
          // typeUrl={item.typeUrl}
          />
        </Col >
      }
      return <Col xs={24} sm={12} md={8} lg={4} key={index}>
        <Avatar
          label={item.label}
          name={item.name}
          hospital={this.state.hospital}
          type={item.type}
          fieldName={item.fieldName}
          typeUrl={item.typeUrl}
        />
      </Col >
    })

    return result
  }

  render() {

    const isLogin = this.state.isLogin;
    return (
      <React.Fragment>
        {
          !isLogin ? <Redirect to={{
            pathname: '/login',
            // state: {
            //   from: location
            // }
          }
          } /> :
            <div>
              <Select changeHospital={this.changeHospital} default={this.state.hospital} size="large" />
              <br />
              <br />
              <Row>
                {this.showAvatar()}
              </Row>
            </div >
        }
      </React.Fragment>
    );
  }
}


// const mapStateToProps = state => {

// };

// const mapDispatchToProps = dispatch => ({
// });


export default connect(null, null)(FormContent);