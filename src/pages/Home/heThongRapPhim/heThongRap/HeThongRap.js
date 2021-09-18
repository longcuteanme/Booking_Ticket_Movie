import React, { Component } from "react";
import { connect } from "react-redux";
import {
  danhSachLichChieuTheoHeThongAction,
  thongTinHeThongRapAction,
} from "../../../../redux/actions/actionCombine";

class HeThongRap extends Component {
  state = {
    pickedIndex: 0,
  };
  changePicked = async (index, maHeThongRap) => {
    await this.props.dispatch(
      danhSachLichChieuTheoHeThongAction.Creators.getSaga(maHeThongRap)
    );
    this.setState({
      pickedIndex: index,
    });
  };
  componentDidMount = () => {
    this.props.dispatch(
      thongTinHeThongRapAction.Creators.getSaga("layThongTinLichChieuPhim")
    );
  };
  renderHeThongRap = (data) => {
    return (
      <div className="grid grid-cols-1">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                this.changePicked(index, item?.maHeThongRap);
              }}
              className={
                this.state.pickedIndex === index
                  ? "opacity-100 h-auto flex justify-center items-center cursor-pointer hover:opacity-100"
                  : "opacity-50 h-auto flex justify-center items-center cursor-pointer hover:opacity-100"
              }
            >
              <img className="w-2/3 my-5" src={item.logo} alt={item.biDanh} />
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    return <>{this.renderHeThongRap(this.props.listHeThongRap)}</>;
  }
}
export default connect((state) => {
  return {
    listHeThongRap: state.thongTinHeThongRapReducer.listHeThongRap,
  };
})(HeThongRap);
