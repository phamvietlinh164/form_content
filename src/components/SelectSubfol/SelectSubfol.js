import React from 'react';
import { Select } from 'antd';
// import { selectObject } from "./select-config";
import { connect } from "react-redux";
// import { getHospitalList } from "../../store/HospitalList/hospitalListActions";
import { selectSubfolAppIcons } from "../../store/SubfolAppIcons/subfolAppIconsActions";

const subfol = [
  {
    value: "image",
    name: "image"
  },
  {
    value: "icons",
    name: "icons"
  },
  {
    value: "icons-chat",
    name: "icons/chat"
  }
]

// console.log(hospitalList)



const { Option } = Select;

class SelectSubfol extends React.Component {

  componentDidMount = () => {
    this.props.selectSubfolAppIcons(this.props.subfolAppIcons.subfolAppIcons)
  }
  handleChange = (value) => {
    // this.props.changeHospital(`${value}`)
    // console.log(value)
    this.props.selectSubfolAppIcons(value)
  }

  showOption = (list) => {

    const result = list.map((item, index) => {
      return <Option value={item.value} key={index}>{item.name}</Option>
    })

    return result
  }

  render() {
    // console.log(this.props.subfolAppIcons)
    return (
      <Select defaultValue="image" style={{ width: 320 }} onChange={this.handleChange} size={"middle"}>
        {this.showOption(subfol)}
      </Select>

    )
  }
}


const mapStateToProps = state => {
  const { subfolAppIcons } = state;
  return { subfolAppIcons };
};


const mapDispatchToProps = dispatch => ({
  selectSubfolAppIcons: (subfol) => {
    dispatch(selectSubfolAppIcons(subfol));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(SelectSubfol);