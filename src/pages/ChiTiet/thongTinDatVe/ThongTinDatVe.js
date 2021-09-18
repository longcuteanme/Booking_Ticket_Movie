import React, { Component, Suspense } from "react";
import moment from "moment";
import TableDatVe from "./TableDatVe/TableDatVe";
import { Translation } from "react-i18next";

class MyComponent extends Component {
  state = {
    hienPhanLichChieu: false,
  };
  changeDisplay = (boolean) => {
    this.setState({
      hienPhanLichChieu: boolean,
    });
  };
  renderLichChieu = (data) => {
    return (
      <div>
        <TableDatVe data={data?.heThongRapChieu} />
      </div>
    );
  };
  renderThongTin = (data) => {
    return (
      <div className="grid grid-cols-2">
        <div>
          <table className="text-lg text-white table-auto">
            <tbody key="tbody">
              <tr>
                <td className="p-2 font-medium">
                  <Translation>{(t) => <>{t("Movie's name")}</>}</Translation>
                </td>
                <td className="p-2 font-light">{data?.tenPhim}</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">
                  <Translation>{(t) => <>{t("Premiere date")}</>}</Translation>
                </td>
                <td className="p-2 font-light">
                  {moment(data?.ngayKhoiChieu).format("DD.MM.YYYY")}
                </td>
              </tr>
              <tr>
                <td className="p-2 font-medium">
                  <Translation>{(t) => <>{t("Director")}</>}</Translation>
                </td>
                <td className="p-2 font-light"></td>
              </tr>
              <tr>
                <td className="p-2 font-medium">
                  <Translation>{(t) => <>{t("Performer")}</>}</Translation>
                </td>
                <td className="p-2 font-light"></td>
              </tr>
              <tr>
                <td className="p-2 font-medium">
                  <Translation>{(t) => <>{t("Category")}</>}</Translation>
                </td>
                <td className="p-2 font-light"></td>
              </tr>
              <tr>
                <td className="p-2 font-medium">
                  <Translation>{(t) => <>{t("Format")}</>}</Translation>
                </td>
                <td className="p-2 font-light">2D/Digitals</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">
                  <Translation>{(t) => <>{t("Nation")}</>}</Translation>
                </td>
                <td className="p-2 font-light"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className="text-lg text-white table-auto">
            <tbody key="tbody">
              <tr>
                <td className="p-2 font-bold">
                  <Translation>{(t) => <>{t("Content")}</>}</Translation>
                </td>
              </tr>
              <tr>
                <td className="p-2">{data?.moTa}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  componentDidMount = () => {
    this.setState({
      hienPhanLichChieu: this.props.data?.dangChieu,
    });
  };
  render() {
    const data = this.props?.data;
    const styleChosenChoice = {
      color: "red",
      fontSize: "2.25rem",
    };
    return (
      <div>
        <div className="text-center">
          {data?.dangChieu ? (
            <h1
              className="text-white DanhSachPhimChoice"
              onClick={() => {
                this.changeDisplay(true);
              }}
              style={this.state.hienPhanLichChieu ? styleChosenChoice : {}}
            >
              <Translation>{(t) => <>{t("Show time")}</>}</Translation>
            </h1>
          ) : (
            <></>
          )}
          <h1
            className="text-white DanhSachPhimChoice"
            onClick={() => {
              this.changeDisplay(false);
            }}
            style={!this.state.hienPhanLichChieu ? styleChosenChoice : {}}
          >
            <Translation>{(t) => <>{t("Info")}</>}</Translation>
          </h1>
        </div>
        <div className="mt-10">
          {this.state.hienPhanLichChieu
            ? this.renderLichChieu(data)
            : this.renderThongTin(data)}
        </div>
      </div>
    );
  }
}

export default function ThongTinDatVe(props) {
  return (
    <Suspense fallback="">
      <MyComponent {...props} />
    </Suspense>
  );
}
