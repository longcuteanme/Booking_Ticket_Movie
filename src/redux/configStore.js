import {applyMiddleware, combineReducers, createStore} from "redux"
import createSagaMiddleware from 'redux-saga'
import loadingReducer from "./reducer/loadingReducer";
import danhSachBannerReducer from "./reducer/danhSachBannerReducer";
import danhSachPhimReducer from "./reducer/danhSachPhimReducer";
import thongTinHeThongRapReducer from "./reducer/thongTinHeThongRapReducer";
import danhSachCumRapTheoHeThongReducer from "./reducer/danhSachCumRapTheoHeThongReducer";
import danhSachLichChieuTheoHeThongReducer from "./reducer/danhSachLichChieuTheoHeThongReducer";
import danhSachPhongVeReducer from './reducer/danhSachPhongVeReducer'
import thongTinPhimReducer from "./reducer/thongTinPhimReducer";
import thongTinTaiKhoanReducer from './reducer/thongTinTaiKhoanReducer'
import modalReducer from "./reducer/modalReducer";
import menuQuanTriReducer from "./reducer/menuQuanTriReducer";
import quanTriNguoiDungReducer from './reducer/quanTriNguoiDungReducer'
import quanTriPhimReducer from './reducer/quanTriPhimReducer'
import loadingTableQuanTriReducer from './reducer/loadingTableQuanTriReducer'
import loadingTablePhimReducer from './reducer/loadingTablePhimReducer'
import localeReducer from './reducer/localeReducer'
import alertReducer from './reducer/alertReducer'
import {sagaRoot} from './saga/sagaRoot'
import { resettableReducer } from 'reduxsauce'

const resettable = resettableReducer('RESET')

const rootReducer=combineReducers({
    //state tong
    alertReducer:resettable(alertReducer),
    loadingReducer:resettable(loadingReducer),
    danhSachBannerReducer:resettable(danhSachBannerReducer),
    danhSachPhimReducer:resettable(danhSachPhimReducer),
    thongTinHeThongRapReducer:resettable(thongTinHeThongRapReducer),
    danhSachCumRapTheoHeThongReducer:resettable(danhSachCumRapTheoHeThongReducer),
    danhSachLichChieuTheoHeThongReducer:resettable(danhSachLichChieuTheoHeThongReducer),
    danhSachPhongVeReducer:resettable(danhSachPhongVeReducer),
    thongTinPhimReducer:resettable(thongTinPhimReducer),
    thongTinTaiKhoanReducer:resettable(thongTinTaiKhoanReducer),
    menuQuanTriReducer:resettable(menuQuanTriReducer),
    quanTriNguoiDungReducer:resettable(quanTriNguoiDungReducer),
    quanTriPhimReducer:resettable(quanTriPhimReducer),
    loadingTableQuanTriReducer:resettable(loadingTableQuanTriReducer),
    loadingTablePhimReducer:resettable(loadingTablePhimReducer),
    modalReducer:resettable(modalReducer),
    localeReducer:resettable(localeReducer),
});

const sagaMiddleware = createSagaMiddleware()

const store=createStore(rootReducer,applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagaRoot)
export default store
