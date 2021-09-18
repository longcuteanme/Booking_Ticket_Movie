import React, { Component, Suspense } from "react";
import ConfigTable from "../../../components/table/ConfigTable";
import { connect } from "react-redux";
import columns from "./ColumnsConfig";
import { Translation } from "react-i18next";
import FormConfig from "./FormConfig";
import {
  otherFunctionAction,
  quanTriNguoiDungAction,
} from "../../../redux/actions/actionCombine";

const editMessage = [
  <Translation>{(t) => <>{t("Add User")}</>}</Translation>,
  <Translation>{(t) => <>{t("Edit User")}</>}</Translation>,
];

class MyComponent extends Component {
  state = {
    pagination: {
      total: 1,
      range: 10,
    },
    key: "",
  };
  changePagination = (pagination) => {
    this.setState({
      pagination: pagination,
    });
  };
  onSearch = async (key) => {
    await this.setState({
      key: key,
    });
    await this.layDuLieu();
  };
  layDuLieu = () => {
    const pagination = this.state.pagination;
    this.props.dispatch(
      quanTriNguoiDungAction.Creators.getSaga({
        tuKhoa: this.state.key,
        soTrang: pagination.total,
        soPhanTuTrenTrang: pagination.range,
      })
    );
  };
  xoaNguoiDung = (taiKhoan) => {
    this.props.dispatch(
      otherFunctionAction.Creators.xoaNguoiDung(
        {
          taiKhoan: taiKhoan,
        },
        () => {
          this.layDuLieu();
        }
      )
    );
  };
  themThongTin = (values) => {
    this.changePagination({ total: 1, range: 10 });
    this.props.dispatch(
      otherFunctionAction.Creators.themNguoiDung(
        {
          taiKhoan: values?.taiKhoan,
          matKhau: values?.matKhau,
          email: values?.email,
          soDt: values?.soDt,
          maNhom: "GP01",
          maLoaiNguoiDung: values?.maLoaiNguoiDung,
          hoTen: values?.hoTen,
        },
        this.layDuLieu()
      )
    );
  };
  suaThongTin = (values) => {
    this.props.dispatch(
      otherFunctionAction.Creators.capNhatThongTinNguoiDung(
        {
          taiKhoan: values.taiKhoan,
          matKhau: values.matKhau,
          email: values.email,
          soDt: values.soDT,
          maNhom: "gp01",
          maLoaiNguoiDung:
            values.loaiNguoiDung === "QuanTri" ? "QuanTri" : "KhachHang",
          hoTen: values.hoTen,
        },
        null,
        this.layDuLieu
      )
    );
  };
  componentDidMount = () => {
    this.layDuLieu();
  };
  render() {
    const data = this.props.danhSachNguoiDungQuanTri;
    const paginationProps = {
      total: data?.totalCount,
    };
    return (
      <>
        <ConfigTable
          title={<Translation>{(t) => <>{t("LIST USERS")}</>}</Translation>}
          columns={columns}
          dataSource={data?.items}
          paginationProps={paginationProps}
          pagination={this.state.pagination}
          layDuLieu={this.layDuLieu}
          formAdd={<FormConfig />}
          xoaNguoiDung={this.xoaNguoiDung}
          truongXoa="taiKhoan"
          suaThongTin={this.suaThongTin}
          themThongTin={this.themThongTin}
          editMessage={editMessage}
          changePagination={this.changePagination}
          onSearch={this.onSearch}
        />
      </>
    );
  }
}

function DanhSachNguoiDung(props) {
  return (
    <Suspense fallback="">
      <MyComponent {...props} />
    </Suspense>
  );
}

export default connect((state) => {
  return {
    danhSachNguoiDungQuanTri:
      state.quanTriNguoiDungReducer.danhSachNguoiDungQuanTri,
  };
})(DanhSachNguoiDung);
