import React, { Component } from "react";
import { Carousel } from "antd";
import {
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {connect} from 'react-redux'
import './CarouselCompo.scss'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { danhSachBannerAction } from "../../../redux/actions/actionCombine";

//Them xac thuc props dau vao
const propTypes={
  lisBanner:PropTypes.arrayOf(
    PropTypes.shape({
      maBanner:PropTypes.number.isRequired,
      maPhim:PropTypes.number.isRequired,
      hinhAnh:PropTypes.string.isRequired,
    }).isRequired
  )
}

const defaultProps={
  listBanner:[]
}
//css cua banner trong slider
const divStyle = {
  width: "100%",
  height: "650px",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const scrollToTop = () => {
  window.scrollTo({
    top:0,
    left:0,
    behavior: 'smooth'
  });
};

class CarouselCompo extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    //Tao ref gan voi carousel cua antd de co the tac dong vao slide
    this.carousel = React.createRef();
  }
  //render cac phan tu cua carousel
  renderCarousel = (content) => {
    return content.map((item, index) => {
      return (
        <Link to={`/ChiTiet/${item?.maPhim}`} onClick={scrollToTop} key={item}>
          <div className="flex items-center justify-center" key={index} style={{ backgroundImage: `url("${item.hinhAnh}")`, ...divStyle,}}>
          </div>
        </Link>
      );
    });
  };
  //nut click de chuyen slide sang phai 1 trang
  next() {
    this.carousel.next();
  }
  //nut click de chuyen slide sang trai 1 trang
  previous() {
    this.carousel.prev();
  }
  componentDidMount=()=>{
    this.props.dispatch(danhSachBannerAction.Creators.getSaga())
  }
  render() {
    const settingCarousel = {
      dots: true,
      infinite: true,
      autoplaySpeed:2000,
      speed:500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="relative w-full" style={{height:'650px'}}>
        {/* Phan hinh anh cua carousel */}
        <div className="" style={{zIndex:'1'}}>
          <Carousel ref={node => (this.carousel = node)} {...settingCarousel} autoplay>{this.renderCarousel(this.props.listBanner)}</Carousel>
        </div>
        {/* nut chuyen slide sang trai */}
        <div className="absolute top-0 left-0 flex items-center h-full z-90">
          <LeftOutlined className="iconCarousel" style={{color:'white'}} onClick={()=>{this.previous()}}/>
        </div>
        {/* nut chuyen slide sang Phai */}
        <div className="absolute top-0 right-0 flex items-center h-full z-90">
        <RightOutlined className="iconCarousel" style={{color:'white'}} onClick={()=>{this.next()}}/>
        </div>
      </div>
    );
  }
}

CarouselCompo.propTypes=propTypes
CarouselCompo.defautProps=defaultProps

export default connect((state)=>{
  return{
    listBanner:state.danhSachBannerReducer.listBanner
  }
})(CarouselCompo)