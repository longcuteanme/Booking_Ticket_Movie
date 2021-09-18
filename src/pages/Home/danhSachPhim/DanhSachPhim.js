import React, { Component,Suspense } from "react";
import PhimItem from "./PhimItem/PhimItem";
import { connect } from "react-redux";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import _ from "lodash";
import "./DanhSachPhim.scss";
import { Translation } from "react-i18next";
import { danhSachPhimAction } from "../../../redux/actions/actionCombine";

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();
  }
  state = {
    choiceActive: true,
  };
  changeChoice = (a) => {
    this.setState({
      choiceActive: a,
    });
  };
  renderPhim = (arr, index) => {
    return arr.map((item2, index2) => {
      return (
        <div key={`${index}-${index2}`}>
          <PhimItem item={item2} />
        </div>
      );
    });
  };
  renderSliderPhim = (arr) => {
    const newArr = _.chunk(arr, 8);
    return newArr.map((item1, index1) => {
      return (
        <div>
          <div className="grid w-full h-full grid-cols-4 gap-5" key={index1}>
            {this.renderPhim(item1, index1)}
          </div>
        </div>
      );
    });
  };
  next() {
    this.carousel.next();
  }
  previous() {
    this.carousel.prev();
  }
  componentDidMount = () => {
    
    this.props.dispatch(danhSachPhimAction.Creators.getSaga());
  };
  render() {
    const data = this.props.danhSachPhim;

    let dangChieu = [],
      sapChieu = [];

    for (const key of data) {
      if (key.dangChieu) {
        dangChieu.push(key);
      } else if (key.sapChieu) {
        sapChieu.push(key);
      }
    }
    const styleChosenChoice = {
      color: "red",
      fontSize: "2.25rem",
    };
    const settingCarousel = {
      infinite: true,
      autoplaySpeed: 5000,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <>
        <div className="text-center">
          <h1
            className="DanhSachPhimChoice"
            style={this.state.choiceActive ? styleChosenChoice : {}}
            onClick={() => {
              this.changeChoice(true);
            }}
          >
            <Translation>{(t) => <>{t("Now showing")}</>}</Translation>
          </h1>
          <h1
            className="DanhSachPhimChoice"
            style={!this.state.choiceActive ? styleChosenChoice : {}}
            onClick={() => {
              this.changeChoice(false);
            }}
          >
            <Translation>{(t) => <>{t("Coming soon")}</>}</Translation>
          </h1>
        </div>
        <div className="flex flex-row justify-between h-auto mt-8">
          <div className="flex items-center w-1/12 h-auto">
            <LeftOutlined
              className="DanhSachPhimIcon"
              onClick={() => {
                this.previous();
              }}
            />
          </div>
          <div className="w-5/6 h-auto">
            <Carousel
              autoplay
              dots={false}
              ref={(node) => (this.carousel = node)}
              {...settingCarousel}
            >
              {this.state.choiceActive
                ? this.renderSliderPhim(dangChieu)
                : this.renderSliderPhim(sapChieu)}
            </Carousel>
          </div>
          <div className="flex items-center w-1/12 h-auto">
            <RightOutlined
              className="DanhSachPhimIcon"
              onClick={() => {
                this.next();
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

function DanhSachPhim(props) {
  return (
    <Suspense fallback="">
      <MyComponent {...props}/>
    </Suspense>
  );
}

export default connect((state) => {
  return {
    danhSachPhim: state.danhSachPhimReducer.danhSachPhim,
  };
})(DanhSachPhim);
