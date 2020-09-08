import React from 'react';
import { Select } from 'antd';
import { connect } from "react-redux";
// import { getHospitalList } from "../../store/HospitalList/hospitalListActions";
import { listFile, listSubFol } from "../../store/SubfolAppIcons/subfolAppIconsActions";

// const subfol = [
//   {
//     value: "image",
//     name: "image"
//   },
//   {
//     value: "icons",
//     name: "icons"
//   },
//   {
//     value: "icons-chat",
//     name: "icons/chat"
//   }
// ]

// console.log(hospitalList)



const { Option } = Select;

class SelectSubfol extends React.Component {

  componentDidMount = () => {
    this.props.getListFile(this.props.subfolAppIcons.subfolAppIcons)
    this.props.listSubFol()
  }
  handleChange = (value) => {
    this.props.getListFile(value);

  }

  showOption = (list) => {

    const result = list.map((item, index) => {
      return <Option value={item.value} key={index}>{item.name}</Option>
    })

    return result
  }

  render() {
    // console.log(this.props.subfolAppIcons)
    const arrSubfol = this.props.subfolAppIcons.listSubFol.map((ele, index) => {
      const name = ele.slice(22).length > 0 ? ele.slice(22) : '(root)'
      return { value: ele.replace(/\//g, "-").slice(22), name: name }
    })

    return (
      <Select defaultValue={this.props.subfolAppIcons.subfolAppIcons} style={{ width: 320 }} onChange={this.handleChange} size={"middle"}>
        {this.showOption(arrSubfol)}
      </Select>

    )
  }
}


const mapStateToProps = state => {
  const { subfolAppIcons } = state;
  return { subfolAppIcons };
};


const mapDispatchToProps = dispatch => ({
  getListFile: (subfol) => {
    dispatch(listFile(subfol));
  },
  listSubFol: () => {
    dispatch(listSubFol());
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(SelectSubfol);