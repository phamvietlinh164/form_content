import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
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
    console.log(fileList)

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

  render() {
    const props = {
      name: this.props.fieldName,
      action: `${currentEnv.DOMAIN_URL}/upload`,
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
        </div>
        <p>{this.props.label}</p><br />
      </div>
    );
  }
}


export default withRouter(UploadContent);