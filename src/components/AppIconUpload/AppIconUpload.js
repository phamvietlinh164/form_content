import React from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { currentEnv } from "../../configs";
import { withRouter } from 'react-router-dom';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


class CustomUpload extends React.Component {
  state = {
    loading: false,
    imageUrl: `${currentEnv.DOMAIN_URL}/static/upload/${this.props.subfol.replace(/-/g, "/")}/${this.props.name}`,
    // isOnSize: false
  };

  componentWillReceiveProps = (newProps) => {
    const subFol = newProps.subfol.replace(/-/g, "/")
    this.setState({
      imageUrl: `${currentEnv.DOMAIN_URL}/static/upload/${subFol}/${newProps.name}?${new Date().getTime()}`
    })
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl: `${currentEnv.DOMAIN_URL}/static/upload/${this.props.subfol.replace(/-/g, "/")}/${this.props.name}?${new Date().getTime()}`,
          loading: false,
        })
        // console.log(info.file.originFileObj.name)
        if (this.props.uploadDone) {
          this.props.uploadDone(info.file.originFileObj.name)
        }

      });

    }
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
    const isCorrectType = file.type === "image/png" || file.type === "image/svg+xml" || file.type === "application/json" || file.type === "image/jpeg";
    if (!isCorrectType) {
      message.error(`You can only upload image/png, image/svg+xml, image/jpeg or application/json file!`);
    }
    var sameType = true;
    if (this.props.name) {
      if (file.name.split(".").slice(-1)[0] !== this.props.name.split(".").slice(-1)[0]) {
        var sameType = false;
        message.error(`Have to be the same type!`);
      }
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!');
    }

    return isCorrectType && isLt5M && sameType
  }


  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;

    return (
      <div className="upload">
        <Upload
          name={this.props.fieldName}
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={`${currentEnv.DOMAIN_URL}/${this.props.action}`}
          headers={{ name: this.props.name, subfol: this.props.subfol.replace(/-/g, "/"), token: `${localStorage.getItem('token')}` }}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="" style={{ maxHeight: '86px', maxWidth: '86px' }} /> : uploadButton}
        </Upload>
        <p>{this.props.label}</p><br />
      </div>

    );
  }
}

export default withRouter(CustomUpload);