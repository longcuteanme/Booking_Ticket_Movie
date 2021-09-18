import React, { Component } from "react";
import { connect } from "react-redux";
import { danhSachLichChieuTheoHeThongAction } from "../../../../redux/actions/actionCombine";

class CumRapTheoHeThong extends Component {
  changePicked = (index) => {
    this.props.dispatch(
      danhSachLichChieuTheoHeThongAction.Creators.changeIndex(index)
    );
  };
  renderCumRap = (data) => {
    return (
      <div className="grid grid-cols-1 overflow-auto" style={{maxHeight:'600px'}}>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                this.changePicked(index);
              }}
              className={
                this.props.pickedIndex === index
                  ? "opacity-100 h-auto cursor-pointer hover:opacity-100 p-3 grid grid-cols-5"
                  : "opacity-50 h-auto cursor-pointer hover:opacity-100 p-3  grid grid-cols-5"
              }
            >
              <div className="col-span-1">
                <img
                  className="w-auto h-auto"
                  src={item?.hinhAnh}
                  alt={item?.tenPhim}
                />
              </div>
              <div className="col-span-4 ml-2">
                <h1 className="text-lg text-left truncate">
                  {item?.tenCumRap}
                </h1>
                <h3 className="font-light text-left truncate">
                  {item?.diaChi}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    return (
      <>{this.renderCumRap(this.props?.listDanhSachLichChieuTheoHeThong)}</>
    );
  }
}
export default connect((state) => {
  return {
    listDanhSachLichChieuTheoHeThong:
      state.danhSachLichChieuTheoHeThongReducer
        .listDanhSachLichChieuTheoHeThong,
    pickedIndex: state.danhSachLichChieuTheoHeThongReducer.pickedIndex,
  };
})(CumRapTheoHeThong);
