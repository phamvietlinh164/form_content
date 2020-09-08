import React from 'react';
import { Input, Button, Row, Col } from 'antd';
// import { selectObject } from "./select-config";
import { connect } from "react-redux";
import { getManageContent } from "../../store/ManageContent/manageContentActions";
import { currentEnv } from "../../configs";

import axios from "axios";


const { Search } = Input;


// console.log(hospitalList)



// const { Option } = Select;

class UpdateMessage extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      message: "",
      disabled: true,
      loading: false
    }
  }


  // componentDidMount = () => {
  //   const partnerId = this.props.manageContent.partnerId;
  //   var message;
  //   axios({
  //     method: 'get',
  //     url: `${currentEnv.RESTFULL_API_URL_V2}/mongo/hospital/danh-sach`,
  //     headers: {
  //       accept: "*/*",
  //       appid: "medpro"
  //     }
  //   }).then((response) => {
  //     response.data.forEach((ele, index) => {
  //       if (ele.partnerId === partnerId) {
  //         // console.log(ele.message);
  //         message = ele.message
  //       }
  //     })
  //     console.log(message)
  //     this.setState({
  //       message
  //     })
  //   });
  // }

  UNSAFE_componentWillReceiveProps = (newProps) => {

    if (this.props.manageContent.partnerId !== newProps.manageContent.partnerId) {
      // console.log('abc');
      this.setState({
        message: "",
        disabled: true
      })
    }

  }

  // updateMessage = (value) => {
  //   console.log(value);
  //   if (this.state.disabled) {
  //     this.setState({ disabled: false })
  //   } else {
  //     this.setState({ disabled: true })
  //   }
  //   const partnerId = this.props.manageContent.partnerId;
  //   var message;

  //   // console.log(newProps.manageContent);
  //   axios({
  //     method: 'get',
  //     url: `${currentEnv.RESTFULL_API_URL_V2}/mongo/hospital/danh-sach`,
  //     headers: {
  //       accept: "*/*",
  //       appid: "medpro"
  //     }
  //   }).then((response) => {
  //     response.data.forEach((ele, index) => {
  //       if (ele.partnerId === partnerId) {
  //         message = ele.message
  //       }
  //     })
  //     this.setState({
  //       message
  //     })
  //   });

  // }

  onClick = () => {
    // this.setState({ disabled: false })
    if (this.state.disabled) {
      this.setState({ loading: true })
      const partnerId = this.props.manageContent.partnerId;
      var message;
      axios({
        method: 'get',
        url: `${currentEnv.RESTFULL_API_URL_V2}/mongo/hospital/danh-sach`,
        headers: {
          accept: "*/*",
          appid: "medpro"
        }
      }).then((response) => {
        response.data.forEach((ele) => {
          if (ele.partnerId === partnerId) {
            message = ele.message
          }
        });
        // console.log(message)
        this.setState({ disabled: false, message, loading: false });

      }).catch(err => {
        console.log(err);
        this.setState({ loading: false })
      });
    } else {
      this.setState({ disabled: true, loading: true });
      axios({
        method: 'post',
        url: `${currentEnv.RESTFULL_API_URL_V2}/mongo/hospital/update-message-partner`,
        headers: {
          accept: "*/*",
          appid: "medpro",
          ContentType: "application/json"
        },
        data: {
          partnerId: this.props.manageContent.partnerId,
          message: this.state.message
        }
      }).then((response) => {
        // console.log(response);
        this.setState({ loading: false })
      }).catch(err => {

        console.log(err);
        this.setState({ loading: false })
      });
    }
    // this.setState({ message: "safhaf" })
  }

  onChange = (e) => {
    // console.log(e.target.value);
    this.setState({ message: e.target.value })
  }

  // handleChange = (value) => {
  //   localStorage.setItem('hospital', value)
  //   this.props.changeHospital(value)
  // }

  // showOption = () => {
  //   // console.log(this.props.hospitalList)
  //   const result = this.props.hospitalList.map((item, index) => {
  //     return <Option value={item.partnerId} key={index}>{item.name}</Option>
  //   })

  //   return result
  // }


  render() {
    // console.log(this.state.message)
    return (
      // <Search
      //   placeholder="Enter your message"

      //   defaultValue={this.state.message}
      //   enterButton="Update Message"
      //   size="large"
      //   onSearch={value => this.updateMessage(value)}
      //   disabled={this.state.disabled}
      // />
      <Row justify="center">
        <Col xs={24} sm={12} md={12} lg={12}>
          <Input
            placeholder="Enter your message"
            value={this.state.message}
            // defaultValue={this.state.message}
            size="middle"
            disabled={this.state.disabled}
            onChange={this.onChange}
          />
        </Col>
        <Col xs={24} sm={4} md={8} lg={10}>
          <Button type="primary" size="middle" onClick={this.onClick} loading={this.state.loading}>Update Message</Button>
        </Col>
      </Row>


    )
  }
}


const mapStateToProps = state => {
  const { manageContent } = state;
  return { manageContent };
};


const mapDispatchToProps = dispatch => ({
  getManageContent: () => {
    dispatch(getManageContent());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(UpdateMessage);