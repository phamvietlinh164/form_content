import React from 'react';
import { Select } from 'antd';
// import { selectObject } from "./select-config";
import { connect } from "react-redux";
import { getHospitalList } from "../../store/HospitalList/hospitalListActions";



// console.log(hospitalList)



const { Option } = Select;

class SelectComponent extends React.Component {

  componentDidMount = () => {
    this.props.getHospitalList()
  }
  handleChange = (value) => {
    this.props.changeHospital(`${value}`)
  }

  showOption = () => {

    const result = this.props.hospitalList.map((item, index) => {
      return <Option value={item.partnerId} key={index}>{item.name}</Option>
    })

    return result
  }

  render() {
    // console.log(this.props.hospitalList)
    return (
      <Select defaultValue={this.props.default} style={{ width: 320 }} onChange={this.handleChange} size={"middle"}>
        {this.showOption()}
      </Select>

    )
  }
}


const mapStateToProps = state => {
  const { hospitalList } = state;
  return { hospitalList };
};


const mapDispatchToProps = dispatch => ({
  getHospitalList: () => {
    dispatch(getHospitalList());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(SelectComponent);