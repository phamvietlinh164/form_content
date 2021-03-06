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


class Avatar extends React.Component {
  state = {
    loading: false,
    imageUrl: `${currentEnv.DOMAIN_URL}/static/upload/hospitals/${this.props.hospital}/${this.props.name}.${this.props.typeUrl}?${new Date().getTime()}`,
    isOnSize: false
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl: `${currentEnv.DOMAIN_URL}/static/upload/hospitals/${this.props.hospital}/${this.props.name}.${this.props.typeUrl}?${new Date().getTime()}`,
          loading: false,
        })
      }
      );
      // var newImage = new Image();
      // newImage.src = `${currentEnv.DOMAIN_URL}/static/upload/hospitals/${this.props.hospital}/${this.props.name}.${this.props.typeUrl}`;
      // localStorage.setItem('needRefresh', "true");
      // window.location.reload();


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

    return new Promise((resolve, reject) => {
      const isJpgOrPng = file.type === this.props.type;
      if (!isJpgOrPng) {
        message.error(`You can only upload ${this.props.type} file!`);
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        message.error('Image must smaller than 5MB!');
      }

      let img = new Image()
      img.src = window.URL.createObjectURL(file)

      img.onload = () => {
        // alert(img.width + " " + img.height);
        // console.log(img.width)
        if (isJpgOrPng && isLt2M && img.width > 100) {
          resolve(file);
        } else {
          reject('abc')
        }

      }

    });
  }



  UNSAFE_componentWillReceiveProps = (newProps) => {

    this.setState({ imageUrl: `${currentEnv.DOMAIN_URL}/static/upload/hospitals/${newProps.hospital}/${newProps.name}.${this.props.typeUrl}` });
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
          action={`${currentEnv.DOMAIN_URL}/upload`}
          headers={{ hospital: this.props.hospital, name: this.props.name, token: `${localStorage.getItem('token')}` }}
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

export default withRouter(Avatar);