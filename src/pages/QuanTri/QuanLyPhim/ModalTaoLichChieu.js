import React, { Component, Suspense } from "react";
import { Modal, Form, Button, DatePicker, Select } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { Translation } from "react-i18next";
import {
  danhSachCumRapTheoHeThongAction,
  otherFunctionAction,
  thongTinHeThongRapAction,
} from "../../../redux/actions/actionCombine";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;

class MyComponent extends Component {
  state = {
    indexCumRap: -1,
  };
  layThongTinCumRap = (maHeThongRap) => {
    this.props.dispatch(
      danhSachCumRapTheoHeThongAction.Creators.getSaga(maHeThongRap)
    );
  };
  layThongTinRap = (indexCumRap) => {
    this.setState({
      indexCumRap: indexCumRap,
    });
  };
  renderHeThongRap = (data) => {
    return data.map((item, index) => {
      return (
        <Option key={index} value={item?.maHeThongRap}>
          <img
            className="inline-block w-5 mr-3"
            src={item?.logo}
            alt="logo"
          ></img>
          {item?.tenHeThongRap}
        </Option>
      );
    });
  };
  renderCumRap = (data) => {
    return data.map((item, index) => {
      return (
        <Option key={index} value={item?.maCumRap}>
          {item?.tenCumRap}
        </Option>
      );
    });
  };
  onFinish = (values) => {
    this.props.dispatch(
      otherFunctionAction.Creators.taoLichChieu({
        maPhim: this.props.data?.maPhim,
        ngayChieuGioChieu: values.ngayChieuGioChieu.format(
          "DD/MM/YYYY HH:mm:ss"
        ),
        maRap: values.cumRap,
        giaVe: values.giaVe,
      })
    );
    this.props.hideModal();
  };
  componentDidMount = () => {
    this.props.dispatch(thongTinHeThongRapAction.Creators.getSaga(null));
  };
  render() {
    const data = this.props.data;
    return (
      <Modal
        onCancel={() => {
          this.props.hideModal();
        }}
        visible={this.props.display}
        centered={true}
        footer={null}
        title={`${data.tenPhim}`}
        width="50vw"
      >
        <Form {...layout} name="modal_tao_lich_chieu" onFinish={this.onFinish}>
          <Form.Item
            name="ngayChieuGioChieu"
            label={
              <Translation>
                {(t) => <>{t("Show date/Show time")}</>}
              </Translation>
            }
          >
            <DatePicker
              format="DD-MM-YYYY HH:mm:ss"
              showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            />
          </Form.Item>
          <Form.Item
            name="heThongRap"
            label={
              <Translation>{(t) => <>{t("Theater System")}</>}</Translation>
            }
          >
            <Select onChange={(value) => this.layThongTinCumRap(value)}>
              {this.renderHeThongRap(this.props.listHeThongRap)}
            </Select>
          </Form.Item>
          <Form.Item
            name="cumRap"
            label={
              <Translation>
                {(t) => <>{t("Cluster of theaters")}</>}
              </Translation>
            }
          >
            <Select>
              {this.renderCumRap(this.props.listDanhSachCumRapTheoHeThong)}
            </Select>
          </Form.Item>
          <Form.Item
            name="giaVe"
            label={<Translation>{(t) => <>{t("Fare")}</>}</Translation>}
          >
            <Select>
              <Option key="1" value={50000}>
                50.000 vnđ
              </Option>
              <Option key="2" value={70000}>
                70.000 vnđ
              </Option>
              <Option key="3" value={90000}>
                90.000 vnđ
              </Option>
              <Option key="4" value={100000}>
                100.000 vnđ
              </Option>
              <Option key="5" value={120000}>
                120.000 vnđ
              </Option>
            </Select>
          </Form.Item>
          <Button type="primary" style={{ width: "100%" }} htmlType="submit">
            {<Translation>{(t) => <>{t("Create showtime")}</>}</Translation>}
          </Button>
        </Form>
      </Modal>
    );
  }
}

function ModalTaoLichChieu(props) {
  return (
    <Suspense fallback="">
      <MyComponent {...props} />
    </Suspense>
  );
}

export default connect((state) => {
  return {
    listHeThongRap: state.thongTinHeThongRapReducer.listHeThongRap,
    listDanhSachCumRapTheoHeThong:
      state.danhSachCumRapTheoHeThongReducer.listDanhSachCumRapTheoHeThong,
  };
})(ModalTaoLichChieu);
