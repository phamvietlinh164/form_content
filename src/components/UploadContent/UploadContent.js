import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';
// import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import axios from 'axios';
import { currentEnv } from "../../configs";
import "./UploadContent.css"

class UploadContent extends React.Component {
  state = {
    fileList: [
      // {
      //   uid: '-1',
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'http://www.baidu.com/xxx.png',
      // },
    ],
  };

  handleChange = info => {

    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);
    // console.log(fileList)

    if (fileList.length > 0) {
      if (fileList[0].type !== this.props.type) {
        fileList[0].status = 'error'
      }
    }
    this.setState({ fileList });

    if (info.file.status === 'error') {
      // Get this url from response in real world.
      if (info.file.response.statusCode === 401) {
        this.props.history.push({
          pathname: '/login',
          state: { message: "Login to upload!" }
        })
      }
    }
  };

  beforeUpload = file => {
    // console.log(file)
    const isJson = file.type === this.props.type;
    if (!isJson) {
      message.error(`You can only upload ${this.props.type} file!`);
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('File must smaller than 5MB!');
    }

    return isJson && isLt2M;
  }

  onClick = () => {
    // console.log('abc')
    // axios.get('http://localhost:6700/download/client-upload-hospitals-115-content.json').then(response => {
    //   console.log(response)
    // }).catch(err => {
    //   console.log(err)
    // })
    // this.props.history.push('/abc')
    // console.log(this.props.manageContent.partnerId)
    const partnerId = this.props.manageContent.partnerId

    axios({
      url: `${currentEnv.DOMAIN_URL}/download/client-upload-hospitals-${partnerId}-content.json`, //your url
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'content.json'); //or any other extension
      document.body.appendChild(link);
      link.click();
    }).catch(err => {
      // console.log(err);
      alert('Some error happen!')
    });
  }


  render() {
    const props = {
      name: this.props.fieldName,
      action: `${currentEnv.DOMAIN_URL}/${this.props.action}`,
      headers: { hospital: this.props.hospital, name: this.props.name, token: `${localStorage.getItem('token')}` },
      onChange: this.handleChange,
      beforeUpload: this.beforeUpload,
      multiple: true,
    };

    return (

      <div className="upload">


        <div className="up_cont">
          <Upload {...props} fileList={this.state.fileList}>
            <Button>
              <UploadOutlined /> Upload
            </Button>
          </Upload>
          <div className="download-but">


            <Button type="primary" icon={<DownloadOutlined />} size='small' onClick={this.onClick}>
              Download
          </Button>

          </div>
        </div>


        <p>{this.props.label}</p><br />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  manageContent: state.manageContent,
});


export default connect(mapStateToProps)(UploadContent);