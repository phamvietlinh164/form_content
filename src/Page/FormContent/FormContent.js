import React from 'react';
import { Row, Col, Input } from 'antd';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import UploadContent from "../../components/UploadContent/UploadContent";
import CustomUpload from "../../components/CustomUpload/CustomUpload";
import AppIconUpload from "../../components/AppIconUpload/AppIconUpload";
import Select from "../../components/Select/Select";
import SelectSubfol from "../../components/SelectSubfol/SelectSubfol";
import { currentEnv } from "../../configs";
import { getManageContent } from "../../store/ManageContent/manageContentActions";
import "./FormContent.css"
import axios from "axios";

class FormContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hospital: "dkkvangiang",
      isLogin: true,
      subfol: "",
      availableAt: ""
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
    // console.log(this.state.hospital)

    this.props.getManageContent(this.state.hospital)
  }

  onChange = (e) => {
    this.setState({
      subfol: e.target.value
    })
  }

  uploadDone = (fileName) => {
    this.setState({
      availableAt: `${currentEnv.DOMAIN_URL}/static/upload/${this.state.subfol}/${fileName}`
    })
  }

  changeHospital = (value) => {
    // localStorage.setItem('hospital', value);
    this.setState({
      hospital: value
    })
    this.props.getManageContent(value)
    // if (localStorage.getItem('needRefresh') === 'true') {
    //   localStorage.setItem('needRefresh', 'false')
    //   window.location.reload();
    // }
    // this.props.history.push('login')
  }

  // onFinish = values => {
  //   console.log('Success:', values);
  // };

  // onFinishFailed = errorInfo => {
  //   console.log('Failed:', errorInfo);
  // };



  showAvatar = (list) => {

    const result = list.map((item, index) => {
      if (item.fieldName === 'content') {
        return <Col xs={24} sm={12} md={8} lg={4} key={index}>
          <UploadContent
            label={item.label}
            name={item.name}
            hospital={this.state.hospital}
            type={item.type}
            fieldName={item.fieldName}
            action={item.action}
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

  showCustomUpload = (list) => {
    // console.log(this.props.subfolAppIcons.subfolAppIcons)
    const result = list.map((item, index) => {

      return <Col xs={24} sm={12} md={8} lg={4} key={index}>
        <AppIconUpload
          label={item}
          name={item}
          fieldName="customUpload"
          action="customUpload"
          subfol={`AppIcon/${this.props.subfolAppIcons.subfolAppIcons}`}
        />
      </Col >
    })

    return result
  }

  render() {

    const isLogin = this.state.isLogin;
    const hospital = this.state.hospital
    const formUploadItem = this.props.manageContent.content.length > 0 ? this.props.manageContent.content : []
    // console.log(this.props.manageContent.content)

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
              <br />
              <br />
              <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <h1>Hospitals Content</h1>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Select changeHospital={this.changeHospital} default={this.state.hospital} />
                </Col>
                <br />
                <br />
                <br />
                {this.showAvatar(formUploadItem)}
                <Col xs={24} sm={12} md={8} lg={4}>
                  <UploadContent
                    label="content.json"
                    name="content"
                    hospital={this.state.hospital}
                    type="application/json"
                    fieldName="content"
                    action="upload"
                  // typeUrl={item.typeUrl}
                  />
                </Col>

              </Row>



              <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <h1>App Icon</h1>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}><SelectSubfol /></Col>
                <br />
                <br />
                <br />
                {this.showCustomUpload(this.props.subfolAppIcons.listFileAppIcons)}

                <br />
                <br />
                <br />
                <br />

              </Row>
              <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <h1>Custom Upload</h1>
                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                  <CustomUpload
                    label="Upload"
                    fieldName="customUpload"
                    action="customUpload"
                    subfol={this.state.subfol}
                    uploadDone={this.uploadDone}
                  // typeUrl={item.typeUrl}
                  />

                </Col>
                <Col xs={24} sm={12} md={8} lg={4}>
                  <Input placeholder="Basic usage" onChange={this.onChange} />
                  <p>{this.state.availableAt}</p>
                </Col>
              </Row>
            </div>
        }
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => ({
  manageContent: state.manageContent,
  subfolAppIcons: state.subfolAppIcons
});

const mapDispatchToProps = dispatch => ({
  getManageContent: (partnerId) => {

    dispatch(getManageContent(partnerId));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(FormContent);