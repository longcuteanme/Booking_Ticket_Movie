import React, { Component, Suspense } from "react";
import ThongTinDatVe from "./thongTinDatVe/ThongTinDatVe";
import { connect } from "react-redux";
import { Tag, Rate, Button } from "antd";
import moment from "moment";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Translation } from "react-i18next";
import {modalAction,thongTinPhimAction} from '../../redux/actions/actionCombine'

const scrollToShowtime = () => {
  window.scrollTo({
    top: 515,
    behavior: "smooth",
  });
};

class MyComponent extends Component {
  state = {
    hienPhanDatve: false,
  };
  changePhanDatVe = (boolean) => {
    setTimeout(500);
    this.setState({
      hienPhanDatve: boolean,
    });
  };
  openModal = (src) => {
    this.props.dispatch(modalAction.Creators.open(src));
  };
  renderInfo = (data) => {
    return (
      <table className="w-full h-auto table-fixed">
        <tbody key="tbody">
          <tr>
            <td className="w-3/12 p-2">
              <div
                className="w-full bg-white bg-top bg-cover h-80"
                style={{
                  backgroundImage: `url(${data?.hinhAnh})`,
                  boxShadow: "0px 0px 15px black",
                }}
                alt={data?.tenPhim}
                onMouseEnter={() => {
                  this.changePhanDatVe(true);
                }}
                onMouseLeave={() => {
                  this.changePhanDatVe(false);
                }}
              >
                <div
                  className="flex items-center justify-center w-full h-80 bg-gradient-to-t from-black to-transparent bg-opacity-70"
                  hidden={!this.state.hienPhanDatve}
                >
                  <PlayCircleOutlined
                    className="DanhSachPhimPlayIcon"
                    style={{ color: "white" }}
                    onClick={() => {
                      this.openModal(data?.trailer);
                    }}
                  />
                </div>
              </div>
            </td>
            <td className="w-6/12 p-2">
              <p className="m-0 text-lg font-normal text-white">
                {moment(data?.ngayKhoiChieu).format("DD.MM.YYYY")}
              </p>
              <h1 className="my-1 text-3xl text-white">
                {data.hot ? <Tag color="#cd201f">HOT</Tag> : <></>}
                {data?.tenPhim
                  ? data?.tenPhim
                  : "Tên phim (do dữ liệu bị hỏng)"}
              </h1>
              <p className="m-0 text-lg font-normal text-white text-green-500">
                120 <Translation>{(t) => <>{t("Minutes")}</>}</Translation> -{" "}
                {data?.danhGia} IMDb - 2D/Digital
              </p>
              <div className="m-2">
                {data?.dangChieu ? (
                  <Button type="primary" danger size="large" onClick={scrollToShowtime}>
                    <span className="font-bold">
                      <Translation>{(t) => <>{t("Buy Ticket")}</>}</Translation>
                    </span>
                  </Button>
                ) : (
                  <Button type="primary" size="large" onClick={scrollToShowtime}>
                    <span className="font-bold">
                      <Translation>
                        {(t) => <>{t("Coming soon")}</>}
                      </Translation>
                    </span>
                  </Button>
                )}
              </div>
            </td>
            <td className="w-3/12 ">
              <h1 className="my-1 text-center text-white text-8xl">
                {data?.danhGia}
              </h1>
              <h3 className="text-xl font-normal text-center text-white">
                IMDb
              </h3>
              <div className="flex justify-center w-full ">
                <Rate
                  disabled
                  allowHalf
                  defaultValue={(data?.danhGia / 10) * 5}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };
  componentDidMount = () => {
    const { id } = this.props?.match?.params;
    this.props.dispatch(thongTinPhimAction.Creators.getSaga(id));
  };
  render() {
    const data = this.props?.thongTinChiTietPhim;
    return (
      <div
        className="w-full h-auto min-h-screen bg-cover"
        style={{ backgroundImage: `url(${data?.hinhAnh})` }}
      >
        <div className="h-auto bg-gray-900 py-28 bg-opacity-90">
          <div className="mx-56">
            <div>{this.renderInfo(data)}</div>
            <div className="mt-20">
              <ThongTinDatVe data={data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function ChiTiet(props) {
  return (
    <Suspense fallback="">
      <MyComponent {...props} />
    </Suspense>
  );
}

export default connect((state) => {
  return {
    thongTinChiTietPhim: state.thongTinPhimReducer.thongTinChiTietPhim,
  };
})(ChiTiet);
