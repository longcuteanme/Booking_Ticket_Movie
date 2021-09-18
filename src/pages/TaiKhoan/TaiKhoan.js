import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import ModalChinhSua from "./ModalChinhSua";
import LoadingBackground from "../../assets/images/LoadingBackground.jpg";
import { Translation } from "react-i18next";
import { thongTinTaiKhoanAction } from "../../redux/actions/actionCombine";

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
    displayModal: false,
  };
  changeModal = (boolean) => {
    this.setState({
      displayModal: boolean,
    });
  };
  renderLichSuDatVe = (data) => {
    let newData = [];
    for (let item of data) {
      let index = newData.findIndex((c) => {
        return c.ngayDat === moment(item?.ngayDat).format("DD-MM-YYYY");
      });
      if (index === -1) {
        newData = [
          {
            ngayDat: moment(item?.ngayDat).format("DD-MM-YYYY"),
            danhSachDat: [item],
          },
          ...newData,
        ];
      } else {
        newData[index].danhSachDat = [item, ...newData[index].danhSachDat];
      }
    }
    return newData.map((item, index) => {
      return (
        <div
          className="p-3 mt-3 border-2 border-gray-300 rounded-lg"
          key={index}
        >
          <div className="flex items-start ">
            <h1 className="inline-block px-3 py-2 m-0 text-lg text-white bg-yellow-600 rounded-md">
              {item.ngayDat}
            </h1>
          </div>
          {item.danhSachDat.map((item2, index2) => {
            return (
              <table className="w-full table-fixed" key={index2}>
                <tbody key="tbody">
                  <tr className="p-3">
                    <th className="w-2/12 p-2">
                      <div
                        className="w-full bg-white bg-center bg-cover h-28 rounded-xs"
                        style={{
                          backgroundImage: `url(${LoadingBackground})`,
                          boxShadow: "0px 0px 3px gray",
                        }}
                      >
                        <div
                          className="w-full h-full bg-center bg-cover shadow-lg rounded-xs"
                          style={{ backgroundImage: `url(${item2?.hinhAnh})` }}
                        ></div>
                      </div>
                    </th>
                    <th className="w-10/12">
                      <h1 className="m-0 text-2xl text-left">
                        {item2?.tenPhim}
                      </h1>
                      <h1 className="m-0 text-sm font-light text-left text-green-500">
                        <Translation>{(t) => <>{t("Length")}</>}</Translation>:{" "}
                        {item2?.thoiLuongPhim}{" "}
                        <Translation>{(t) => <>{t("Minutes")}</>}</Translation>
                      </h1>
                      <table className="w-full h-auto">
                        <tbody key="tbody">
                          <tr>
                            <th className="w-8/12 align-top">
                              <h1 className="m-0 text-left text-md">
                                <Translation>
                                  {(t) => <>{t("Cluster of theaters")}</>}
                                </Translation>
                                :{" "}
                                <span className="italic font-light">
                                  {item2?.danhSachGhe[0]?.tenHeThongRap}
                                </span>
                              </h1>
                            </th>
                            <th className="w-4/12 align-top">
                              <h1 className="m-0 text-left text-md">
                                <Translation>
                                  {(t) => <>{t("Theater")}</>}
                                </Translation>
                                :{" "}
                                <span className="italic font-light">
                                  {item2?.danhSachGhe[0]?.tenCumRap}
                                </span>
                              </h1>
                            </th>
                          </tr>
                          <tr>
                            <th className="w-8/12 align-top">
                              <h1 className="m-0 text-left text-md">
                                <Translation>
                                  {(t) => <>{t("Booked chair")}</>}
                                </Translation>
                                :{" "}
                                {item2?.danhSachGhe.map((item3, index3) => {
                                  return (
                                    <span
                                      className="inline-block font-light text-yellow-600"
                                      key={index3}
                                    >
                                      {`${
                                        abc[
                                          Math.floor(Number(item3?.tenGhe) / 16)
                                        ]
                                      }${Number(item3?.tenGhe) % 16},`}
                                    </span>
                                  );
                                })}
                              </h1>
                            </th>
                            <th className="w-4/12 align-top">
                              <h1 className="m-0 text-left text-md">
                                <Translation>
                                  {(t) => <>{t("Booking time")}</>}
                                </Translation>
                                :{" "}
                                <span className="font-light text-yellow-600">
                                  {moment(item2.ngayDat).format("kk:mm")}
                                </span>
                              </h1>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </th>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
      );
    });
  };
  componentDidMount = () => {
    this.props.dispatch(thongTinTaiKhoanAction.Creators.getSaga());
  };
  render() {
    const thongTinTaiKhoan = this.props.thongTinTaiKhoan;
    return (
      <div className="w-full h-auto px-32 py-10 bg-gray-300">
        <ModalChinhSua
          display={this.state.displayModal}
          changeModal={this.changeModal}
          info={{
            taiKhoan: thongTinTaiKhoan?.taiKhoan,
            matKhau: thongTinTaiKhoan?.matKhau,
            hoTen: thongTinTaiKhoan?.hoTen,
            email: thongTinTaiKhoan?.email,
            soDT: thongTinTaiKhoan?.soDT,
            loaiNguoiDung: thongTinTaiKhoan?.loaiNguoiDung,
          }}
          history={this.props.history}
        />
        <table className="w-full table-fixed">
          <tbody key="tbody">
            <tr>
              <th className="w-5/12 h-auto p-3 align-top">
                <div
                  className="w-full h-auto p-4 bg-white rounded-lg"
                  style={{ boxShadow: "0px 0px 7px gray" }}
                >
                  <div className="inline-block w-auto p-5 border-4 border-gray-500 rounded-full">
                    <UserOutlined
                      style={{ fontSize: "90px", color: "gray", margin: "0" }}
                    />
                  </div>
                  <h1 className="mt-2 mb-0 text-3xl">
                    {thongTinTaiKhoan?.taiKhoan}
                  </h1>
                </div>
                <div
                  className="w-full h-auto p-3 mt-5 bg-white rounded-lg"
                  style={{ boxShadow: "0px 0px 7px gray" }}
                >
                  <table className="w-full divide-y-2 divide-gray-200 table-fixed">
                    <tbody key="tbody">
                      <tr>
                        <th className="w-1/3 p-4 text-lg text-left">
                          <Translation>
                            {(t) => <>{t("Full name")}</>}
                          </Translation>
                        </th>
                        <th className="w-2/3 p-4 text-lg font-light text-right">
                          {thongTinTaiKhoan?.hoTen}
                        </th>
                      </tr>
                      <tr>
                        <th className="w-1/3 p-4 text-lg text-left">
                          <Translation>{(t) => <>{t("Email")}</>}</Translation>
                        </th>
                        <th className="w-1/3 p-4 text-lg font-light text-right">
                          {thongTinTaiKhoan?.email}
                        </th>
                      </tr>
                      <tr>
                        <th className="w-1/3 p-4 text-lg text-left">
                          <Translation>
                            {(t) => <>{t("Phone Number")}</>}
                          </Translation>
                        </th>
                        <th className="w-2/3 p-4 text-lg font-light text-right">
                          {thongTinTaiKhoan?.soDT}
                        </th>
                      </tr>
                      <tr>
                        <th className="w-1/3 p-4 text-lg text-left">
                          <Translation>{(t) => <>{t("User")}</>}</Translation>
                        </th>
                        <th className="w-2/3 p-4 text-lg font-light text-right">
                          {thongTinTaiKhoan?.loaiNguoiDung === "QuanTri"
                            ? "Quản trị"
                            : "Khách hàng"}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                  <div className="w-full p-2 mt-4 bg-blue-500 cursor-pointer hover:bg-blue-400">
                    <h1
                      className="m-0 text-lg text-white"
                      onClick={() => {
                        this.changeModal(true);
                      }}
                    >
                      <Translation>
                        {(t) => <>{t("Update Information")}</>}
                      </Translation>
                    </h1>
                  </div>
                </div>
              </th>
              <th className="w-7/12 h-auto p-3 align-top">
                <div
                  className="w-full p-3 overflow-auto bg-white rounded-lg"
                  style={{ boxShadow: "0px 0px 7px gray", height: "590px" }}
                >
                  <h1 className="text-2xl">
                    <Translation>
                      {(t) => <>{t("Booking history")}</>}
                    </Translation>
                  </h1>
                  <div>
                    {thongTinTaiKhoan?.thongTinDatVe ? (
                      this.renderLichSuDatVe(thongTinTaiKhoan?.thongTinDatVe)
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function TaiKhoan(props) {
  return (
    <Suspense fallback="">
      <MyComponent {...props} />
    </Suspense>
  );
}

export default connect((state) => {
  return {
    thongTinTaiKhoan: state.thongTinTaiKhoanReducer.thongTinTaiKhoan,
  };
})(TaiKhoan);
