import { Spin } from 'antd'
import React, { Component } from 'react'
import CarouselCompo from './carousel/CarouselCompo'
import DanhSachPhim from './danhSachPhim/DanhSachPhim'
import HeThongRapPhim from './heThongRapPhim/HeThongRapPhim'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'


//xac thuc prop dau vao cua component va gan gia tri mac dinh
const propTypes={
    loading:PropTypes.bool.isRequired
}
const defaultProps={
    loading:false
}
class Home extends Component {
    render() {
        return (
            <div className="w-full">
                {/* Carousel cua trang */}
                <div className="w-full">
                    <CarouselCompo/>
                </div>
                <div className="h-auto m-32">
                    {/* Danh sach cac phim dang chieu va sap chieu */}
                    <div>
                        <DanhSachPhim/>
                    </div>
                    {/* Hien thi he thong rap va cac phim rap danh chieu hoac sap chieu */}
                    <div className="mt-32">
                        <Spin spinning={this.props.loading}>
                            <HeThongRapPhim/>
                        </Spin> 
                    </div>
                </div>
            </div>
        )
    }
}

Home.propTypes=propTypes
Home.defaultProps=defaultProps

export default connect((state)=>{
    return{
        loading:state.loadingTablePhimReducer.loading
    }
})(Home)
