import React, { Component, Suspense } from "react";
import { Redirect } from "react-router-dom";
import { USER_ACCESS_TOKEN } from "../../utils/constants/settingSystem";
import { connect } from "react-redux";
import _ from "lodash";
import { Translation } from "react-i18next";
import {
  danhSachPhongVeAction,
  otherFunctionAction,
} from "../../redux/actions/actionCombine";
import { getCookie } from "../../utils/functions/systemFunction";

const abc = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
];

class MyComponent extends Component {
  state = {
    gheDaDat: [],
  };
  thayDoiGheDat = (item) => {
    let newGheDaDat = this.state.gheDaDat;
    let index = newGheDaDat.findIndex((c) => {
      return c?.maGhe === item?.maGhe;
    });
    if (index === -1) {
      this.setState({
        gheDaDat: [...newGheDaDat, item],
      });
    } else {
      newGheDaDat.splice(index, 1);
      this.setState({
        gheDaDat: [...newGheDaDat],
      });
    }
  };
  renderDanhSachGhe = (data) => {
    let doDaiGhe = data.length / 10;
    const newData = _.chunk(data, doDaiGhe);
    let chiSoGhe = [];
    for (let i = 0; i < doDaiGhe; i++) {
      chiSoGhe[i] = i + 1;
    }
    return (
      <table className="w-full table-fixed">
        <tbody key="tbody">
          <tr>
            <th className="w-1/12"></th>
            <th className="w-10/12 pb-2">
              <div
                className="w-full"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${doDaiGhe}, minmax(0, 1fr))`,
                }}
              >
                {chiSoGhe.map((item, index) => {
                  return (
                    <div className="p-1" key={index}>
                      <div className="w-full h-6 m-0 font-light text-white bg-gray-800 bg-opacity-75 rounded-md shadow-inner">
                        {item}
                      </div>
                    </div>
                  );
                })}
              </div>
            </th>
            <th className="w-1/12"></th>
          </tr>
          <tr>
            <th className="w-1/12">
              <table>
                <tbody key="tbody">
                  {abc.map((item, index) => {
                    if (index < 10) {
                      return (
                        <tr key={index}>
                          <th className="p-1">
                            <div className="w-6 h-6 m-0 font-light text-white bg-gray-800 bg-opacity-75 rounded-md shadow-inner">
                              {item}
                            </div>
                          </th>
                        </tr>
                      );
                    } else return <></>;
                  })}
                </tbody>
              </table>
            </th>
            <th className="w-10/12">
              <table className="w-full">
                <tbody key="tbody">
                  {newData.map((item, index) => {
                    return (
                      <tr key={index}>
                        {item.map((item2, index2) => {
                          let dacTinh =
                            "from-gray-400 to-gray-200 cursor-pointer hover:opacity-80";
                          if (item2?.loaiGhe === "Vip") {
                            dacTinh =
                              "from-yellow-400 to-yellow-200 cursor-pointer hover:opacity-80";
                          }
                          if (item2?.daDat) {
                            dacTinh = "from-red-600 to-red-400";
                          } else if (item2?.taiKhoanNguoiDat) {
                            dacTinh = "from-blue-600 to-blue-400";
                          } else if (
                            this.state.gheDaDat.findIndex((c) => {
                              return c?.maGhe === item2?.maGhe;
                            }) !== -1
                          ) {
                            dacTinh =
                              "from-green-600 to-green-400 cursor-pointer";
                          }
                          return (
                            <td className="p-1" key={index2}>
                              {!item2?.daDat && !item2?.taiKhoanNguoiDat ? (
                                <div
                                  className={`w-full h-6 rounded-md bg-gradient-to-r ${dacTinh}`}
                                  onClick={() => {
                                    this.thayDoiGheDat(item2);
                                  }}
                                ></div>
                              ) : (
                                <div
                                  className={`w-full h-6 rounded-md bg-gradient-to-r ${dacTinh}`}
                                ></div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </th>
            <th className="w-1/12"></th>
          </tr>
        </tbody>
      </table>
    );
  };
  datVe = () => {
    const danhSachVe = this.state.gheDaDat.map((item) => {
      return {
        maGhe: item?.maGhe,
        giaVe: item?.giaVe,
      };
    });
    this.props.dispatch(
      otherFunctionAction.Creators.datVe(
        {
          maLichChieu: this.props.match.params?.id,
          danhSachVe: danhSachVe,
        },
        this.props.history
      )
    );
  };
  componentDidMount = () => {
    this.props.dispatch(
      danhSachPhongVeAction.Creators.getSaga(this.props.match.params?.id)
    );
  };
  render() {
    if (getCookie(USER_ACCESS_TOKEN) !== "{}") {
      const thongTinPhim = this.props.thongTinPhim;
      const danhSachGhe = this.props.danhSachGhe;
      let doDaiGhe = danhSachGhe.length / 10;
      let tongTien = 0;
      for (let i = 0; i < this.state.gheDaDat.length; i++) {
        tongTien = tongTien + this.state.gheDaDat[i]?.giaVe;
      }
      return (
        <div
          className="w-full h-auto min-h-screen bg-top bg-cover"
          style={{ backgroundImage: `url(${thongTinPhim?.hinhAnh})` }}
        >
          <div className="h-auto bg-gray-900 py-28 bg-opacity-90">
            <div className="mx-32">
              <table className="w-full table-fixed">
                <tbody key="tbody">
                  <tr>
                    <th className="w-7/12 align-top">
                      <div className="w-full h-3 bg-yellow-400"></div>
                      <div className="w-full h-10 bg-gradient-to-b from-white to-transparent">
                        <h1 className="text-lg font-bold text-red-700">
                          <Translation>{(t) => <>{t("Screen")}</>}</Translation>
                        </h1>
                      </div>
                      <div className="mt-5">
                        {this.renderDanhSachGhe(danhSachGhe)}
                        <div className="mt-7">
                          <div className="flex justify-around font-light text-white">
                            <div className="flex items-center">
                              <div className="inline-block w-6 h-6 mr-2 rounded-md bg-gradient-to-r from-gray-400 to-gray-200"></div>
                              <Translation>
                                {(t) => <>{t("Regular")}</>}
                              </Translation>
                            </div>
                            <div className="flex items-center">
                              <div className="inline-block w-6 h-6 mr-2 rounded-md bg-gradient-to-r from-yellow-400 to-yellow-200"></div>
                              <Translation>
                                {(t) => <>{t("Vip")}</>}
                              </Translation>
                            </div>
                            <div className="flex items-center">
                              <div className="inline-block w-6 h-6 mr-2 rounded-md bg-gradient-to-r from-green-600 to-green-400"></div>
                              <Translation>
                                {(t) => <>{t("Selected chair")}</>}
                              </Translation>
                            </div>
                            <div className="flex items-center">
                              <div className="inline-block w-6 h-6 mr-2 rounded-md bg-gradient-to-r from-red-600 to-red-400"></div>
                              <Translation>
                                {(t) => <>{t("Booked")}</>}
                              </Translation>
                            </div>
                            <div className="flex items-center">
                              <div className="inline-block w-6 h-6 mr-2 rounded-md bg-gradient-to-r from-blue-600 to-blue-400"></div>
                              <Translation>
                                {(t) => <>{t("Being selected")}</>}
                              </Translation>
                            </div>
                          </div>
                        </div>
                      </div>
                    </th>
                    <th className="w-5/12 px-5 align-top">
                      <div
                        className="w-full h-auto p-4 border-2 border-white rounded-md"
                        style={{ boxShadow: "0px 0px 10px white" }}
                      >
                        <div class="divide-y divide-dashed divide-white-500">
                          <div>
                            <h1 className="text-3xl font-bold text-white">
                              {thongTinPhim?.tenPhim}
                            </h1>
                          </div>
                          <div className="grid grid-cols-2 py-3">
                            <h1 className="text-lg font-medium text-left text-white">
                              <Translation>
                                {(t) => <>{t("Show date/Show time")}</>}
                              </Translation>
                            </h1>
                            <h1 className="text-lg font-light text-right text-white">
                              {thongTinPhim?.ngayChieu}-
                              <span className="text-yellow-400">
                                {thongTinPhim?.gioChieu}
                              </span>
                            </h1>
                          </div>
                          <div className="grid grid-cols-2 py-3">
                            <h1 className="text-lg font-medium text-left text-white">
                              <Translation>
                                {(t) => <>{t("Cluster of theaters")}</>}
                              </Translation>
                            </h1>
                            <div>
                              <h1 className="text-lg font-light text-right text-white">
                                {thongTinPhim?.tenCumRap}
                              </h1>
                              <h1 className="text-xs font-light text-right text-yellow-400">
                                {thongTinPhim?.diaChi}
                              </h1>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 py-3">
                            <h1 className="text-lg font-medium text-left text-white">
                              <Translation>
                                {(t) => <>{t("Theater")}</>}
                              </Translation>
                            </h1>
                            <h1 className="text-lg font-light text-right text-white">
                              {thongTinPhim?.tenRap}
                            </h1>
                          </div>
                          <div className="grid h-auto grid-cols-2 py-3">
                            <h1 className="text-lg font-medium text-left text-white">
                              <Translation>
                                {(t) => <>{t("Selected chair")}</>}
                              </Translation>
                            </h1>
                            <div className="text-right ">
                              {this.state.gheDaDat.map((item, index) => {
                                return (
                                  <p
                                    className="inline-block text-lg font-light text-right text-white"
                                    key={index}
                                  >
                                    <span className="text-yellow-400">{` ${
                                      abc[
                                        Math.floor(Number(item?.stt) / doDaiGhe)
                                      ]
                                    }${Number(item?.stt) % doDaiGhe}`}</span>
                                    -{item?.giaVe.toLocaleString()},
                                  </p>
                                );
                              })}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 py-3">
                            <h1 className="text-lg font-medium text-left text-white">
                              <Translation>
                                {(t) => <>{t("Sale")}</>}
                              </Translation>
                            </h1>
                            <h1 className="text-lg font-light text-right text-white">
                              0%
                            </h1>
                          </div>
                          <div className="grid grid-cols-2 py-3">
                            <h1 className="text-lg font-medium text-left text-white">
                              <Translation>
                                {(t) => <>{t("Total amount")}</>}
                              </Translation>
                            </h1>
                            <h1 className="text-lg font-light text-right text-white">
                              {tongTien.toLocaleString()} vnđ
                            </h1>
                          </div>
                          <div className="py-3">
                            <div
                              className="w-full py-3 text-xl text-center text-white cursor-pointer bg-gradient-to-r from-yellow-600 to-yellow-500 hover:opacity-75"
                              onClick={() => {
                                this.datVe();
                              }}
                            >
                              <Translation>
                                {(t) => <>{t("Book")}</>}
                              </Translation>
                            </div>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else {
      alert("Vui lòng đăng nhập để tiến hành đặt vé");
      return <Redirect to="/Login" />;
    }
  }
}

function DatVe(props) {
  return (
    <Suspense fallback="">
      <MyComponent {...props} />
    </Suspense>
  );
}

export default connect((state) => {
  return {
    thongTinPhim: state.danhSachPhongVeReducer.thongTinPhim,
    danhSachGhe: state.danhSachPhongVeReducer.danhSachGhe,
  };
})(DatVe);
