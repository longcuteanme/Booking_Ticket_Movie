import React, { Component,Suspense } from "react";
import { PlayCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBackground from '../../../../assets/images/LoadingBackground.jpg'
import { Translation } from "react-i18next";
import { modalAction } from "../../../../redux/actions/actionCombine";

const scrollToTop = () => {
  window.scrollTo(0, 0)
}

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
  renderPhim = (item2) => {
    return (
      <div
        className="relative w-full h-auto bg-white"
        onMouseEnter={() => {
          this.changePhanDatVe(true);
        }}
        onMouseLeave={() => {
          this.changePhanDatVe(false);
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-auto px-1 z-90"
          hidden={!this.state.hienPhanDatve}
        >
          <div className="flex items-center justify-center rounded-md h-80 bg-gradient-to-t from-black to-transparent bg-opacity-70">
            <PlayCircleOutlined
              className="DanhSachPhimPlayIcon"
              style={{ color: "white" }}
              onClick={() => {
                this.openModal(item2?.trailer);
              }}
            />
          </div>
          <div className="h-20 py-3">
            <Link 
              onClick={scrollToTop}
              to={{
                pathname: `/ChiTiet/${item2?.maPhim}`,
              }}
            >
                {item2?.dangChieu
                ? <div className="flex items-center justify-center w-full h-full transition-colors duration-500 bg-red-600 rounded-md cursor-pointer hover:bg-red-500">
                    <p className="m-0 text-xl text-center text-white align-center">
                      <Translation>{(t) => <>{t("Buy Ticket")}</>}</Translation>
                    </p>
                  </div>
                : <div className="flex items-center justify-center w-full h-full transition-colors duration-500 bg-blue-600 rounded-md cursor-pointer hover:bg-blue-500">
                    <p className="m-0 text-xl text-center text-white align-center"><Translation>{(t) => <>{t("See Details")}</>}</Translation></p>
                  </div>
                }
            </Link>
          </div>
        </div>
        <div className="px-1">
          <div
            className="bg-center bg-cover rounded-md h-80"
            style={{ backgroundImage: `url(${LoadingBackground})`, boxShadow:'0px 0px 4px gray'}}
          >
            <div className="w-full h-full bg-center bg-cover rounded-md shadow-lg"
            style={{ backgroundImage: `url(${item2?.hinhAnh})` }}>
            </div>
          </div>
          <div className="h-20 p-2">
            <h1 className="text-lg font-medium text-black truncate">
              {item2?.tenPhim}
            </h1>
            <span className="text-sm font-thin text-green-700">
              120 <Translation>{(t) => <>{t("Minutes")}</>}</Translation> - {item2?.danhGia} IMBd
            </span>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return <>{this.renderPhim(this.props.item)}</>;
  }
}

function PhimItem(props) {
  return (
    <Suspense fallback="">
      <MyComponent {...props}/>
    </Suspense>
  );
}

export default connect()(PhimItem);
