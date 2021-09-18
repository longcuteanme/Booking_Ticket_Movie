import { takeLatest, put, call } from "redux-saga/effects";
import { STATUS_CODE } from "../../utils/constants/settingSystem";
import {messageCombine,descriptionCombine,typeCombine} from '../../utils/constants/alertSystem'
import {danhSachPhongVeTypes,otherFunctionTypes} from '../types/typesCombine'
import {loadingAction,danhSachPhongVeAction,alertAction} from '../actions/actionCombine'
import { QuanLyDatVeService } from "../../services/quanLyDatVeService";

// function lay danh sach phong ve
function* layDanhSachPhongVe(action) {
  const id = action.id
  yield put(loadingAction.Creators.display());
  try {
    let { data, status } = yield call(
      QuanLyDatVeService.layDanhSachPhongVe,
      id
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(danhSachPhongVeAction.Creators.get(data.content.thongTinPhim,data.content.danhSachGhe));
    }
  } catch (err) {
    
    yield put(alertAction.Creators.open(
      messageCombine.khongLayDuocDuLieu,
      descriptionCombine.khongLayDuocDuLieu,
      typeCombine.error
    ))
  }
  yield put(loadingAction.Creators.hide());
}
export function* sagaLayDanhSachPhongVe() {
  yield takeLatest(danhSachPhongVeTypes.GET_SAGA, layDanhSachPhongVe);
}

//function giup thuc hien dat ve cho khach hang
function* datVe(action) {
  const model = action.datVe;
  const history = action.history;
  yield put(loadingAction.Creators.display());
  try {
    let { status } = yield call(QuanLyDatVeService.datVe, model);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(alertAction.Creators.open(
        messageCombine.datVeThanhCong,
        null,
        typeCombine.success
      ))
    }
  } catch (error) {
    const err = { ...error };
    if (err?.response?.data) {
      yield alert(
        `ERROR${err?.response?.status}: ${err?.response?.data?.content}`
      );
    } else {
      yield put(alertAction.Creators.open(
        messageCombine.loiTrongQuaTrinhXuLy,
        descriptionCombine.loiTrongQuaTrinhXuLy,
        typeCombine.error
      ))
    }
  }
  yield history.push("/TaiKhoan");
  yield put(loadingAction.Creators.hide());
}
export function* sagaDatVe() {
  yield takeLatest(otherFunctionTypes.DAT_VE, datVe);
}

//function giup tao lich chieu cho phim tai phan quan tri
function* taoLichChieu(action) {
  const model = action.model;
  try {
    let { status } = yield call(QuanLyDatVeService.taoLichChieu, model);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(alertAction.Creators.open(
        messageCombine.taoLichChieuThanhCong,
        null,
        typeCombine.success
      ))
    }
  } catch (error) {
    const err = { ...error };
    if (err?.response?.data) {
      yield alert(
        `ERROR${err?.response?.status}: ${err?.response?.data?.content}`
      );
    } else {
      yield put(alertAction.Creators.open(
        messageCombine.loiTrongQuaTrinhXuLy,
        descriptionCombine.loiTrongQuaTrinhXuLy,
        typeCombine.error
      ))
    }
  }
}
export function* sagaTaoLichChieu() {
  yield takeLatest(otherFunctionTypes.TAO_LICH_CHIEU, taoLichChieu);
}
