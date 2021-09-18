import { takeLatest, put, call } from "redux-saga/effects";
import { QuanLyNguoiDungService } from "../../services/quanLyNguoiDungService";
import {messageCombine,descriptionCombine,typeCombine} from '../../utils/constants/alertSystem'
import { setCookie } from "../../utils/functions/systemFunction";
import {
  STATUS_CODE,
  USER_ACCESS_TOKEN,
  USER_INFO,
} from "../../utils/constants/settingSystem";
import {
  otherFunctionTypes,
  thongTinTaiKhoanTypes,
  quanTriNguoiDungTypes,
} from "../types/typesCombine";
import {
  loadingAction,
  thongTinTaiKhoanAction,
  loadingTableQuanTriAction,
  quanTriNguoiDungAction,
  alertAction,
} from "../actions/actionCombine";

//function dang nhap cua trang web
function* dangNhap(action) {
  yield put(loadingAction.Creators.display());
  const model = action.dangNhap;
  const history = action.history;
  try {
    let { data, status } = yield call(QuanLyNguoiDungService.dangNhap, model);
    if (status === STATUS_CODE.SUCCESS) {
      yield setCookie(USER_INFO,JSON.stringify(data.content))
      yield setCookie(USER_ACCESS_TOKEN,JSON.stringify(data.content.accessToken))
      yield put(alertAction.Creators.open(
        messageCombine.dangNhapThanhCong,
        null,
        typeCombine.success
      ))
    }
  } catch (error) {
    const err = { ...error };
    if (err?.response?.data) {
      yield put(alertAction.Creators.open(
        messageCombine.errorMessage(err?.response?.status),
        descriptionCombine.errorDescription(err?.response?.data?.content),
        typeCombine.error
      ))
    } else {
      yield put(alertAction.Creators.open(
        messageCombine.loiTrongQuaTrinhXuLy,
        descriptionCombine.loiTrongQuaTrinhXuLy,
        typeCombine.error
      ))
    }
  }
  yield put(loadingAction.Creators.hide());
  yield history.goBack();
}
export function* sagaDangNhap() {
  yield takeLatest(otherFunctionTypes.DANG_NHAP, dangNhap);
}

//function dang ky cua trang web
function* dangKy(action) {
  yield put(loadingAction.Creators.display());
  const model = action.model;
  try {
    let { status } = yield call(QuanLyNguoiDungService.dangKy, model);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(alertAction.Creators.open(
        messageCombine.dangKyThanhCong,
        null,
        typeCombine.success
      ))
      yield action.changeDangNhap();
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
  yield put(loadingAction.Creators.hide());
}
export function* sagaDangKy() {
  yield takeLatest(otherFunctionTypes.DANG_KY, dangKy);
}

//function lay thong tin tai khoan nguoi dung
function* thongTinTaiKhoan() {
  yield put(loadingAction.Creators.display());
  try {
    let { data, status } = yield call(QuanLyNguoiDungService.thongTinTaiKhoan);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(thongTinTaiKhoanAction.Creators.get(data.content));
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
export function* sagaThongTinTaiKhoan() {
  yield takeLatest(thongTinTaiKhoanTypes.GET_SAGA, thongTinTaiKhoan);
}

//function cap nhat thong tin nguoi dung
function* capNhatThongTinNguoiDung(action) {

  if (action.history) {
    yield put(loadingAction.Creators.display());
  } else if (action.layDuLieu) {
    yield put(loadingTableQuanTriAction.Creators.display());
  }
  const model = action.model;
  try {
    let { status } = yield call(
      QuanLyNguoiDungService.capNhatThongTinNguoiDung,
      model
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(alertAction.Creators.open(
        messageCombine.capNhatThongTinThanhCong,
        null,
        typeCombine.success
      ))
    }
  } catch (error) {
    const err = { ...error };
    if (err?.response?.data) {
      yield put(alertAction.Creators.open(
        messageCombine.errorMessage(err?.response?.status),
        descriptionCombine.errorDescription(err?.response?.data?.content),
        typeCombine.error
      ))
    } else {
      yield put(alertAction.Creators.open(
        messageCombine.loiTrongQuaTrinhXuLy,
        descriptionCombine.loiTrongQuaTrinhXuLy,
        typeCombine.error
      ))
    }
  }
  yield action.history ? action.history() : action.layDuLieu();
  if (action.layDuLieu) {
    yield put(loadingTableQuanTriAction.Creators.hide());
  }
}
export function* sagaCapNhatThongTinNguoiDung() {
  yield takeLatest(
    otherFunctionTypes.CAP_NHAT_THONG_TIN_NGUOI_DUNG,
    capNhatThongTinNguoiDung
  );
}

//function lay danh sach nguoi dung trong muc quan tri
function* layDanhSachNguoiDungPhanTrang(action) {
  yield put(loadingTableQuanTriAction.Creators.display());
  const model = action.model;
  try {
    let { data, status } = yield call(
      QuanLyNguoiDungService.layDanhSachNguoiDungPhanTrang,
      model
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(quanTriNguoiDungAction.Creators.get(data.content));
    }
  } catch (err) {
    yield put(alertAction.Creators.open(
      messageCombine.khongLayDuocDuLieu,
      descriptionCombine.khongLayDuocDuLieu,
      typeCombine.error
    ))
  }
  yield put(loadingTableQuanTriAction.Creators.hide());
}
export function* sagaLayDanhSachNguoiDungPhanTrang() {
  yield takeLatest(
    quanTriNguoiDungTypes.GET_SAGA,
    layDanhSachNguoiDungPhanTrang
  );
}

//function xoa nguoi dung o phan quna tri
function* xoaNguoiDung(action) {
  yield put(loadingTableQuanTriAction.Creators.display());
  const model = action.model;
  try {
    let respond = yield call(QuanLyNguoiDungService.xoaNguoiDung, model);
    if (respond.status === STATUS_CODE.SUCCESS) {
      yield put(alertAction.Creators.open(
        messageCombine.xoaTaiKhoanThanhCong(model.taiKhoan),
        null,
        typeCombine.success
      ))
      yield action.layDuLieu();
    }
  } catch (error) {
    const err = { ...error };
    console.log('err',err)
    if (err?.response?.data) {
      console.log('bao loi')
      yield put(alertAction.Creators.open(
        messageCombine.errorMessage(err?.response?.status),
        descriptionCombine.errorDescription(err?.response?.data?.content),
        typeCombine.error
      ))
    } else {
      console.log('co loi trong xu ly')
      yield put(alertAction.Creators.open(
        messageCombine.loiTrongQuaTrinhXuLy,
        descriptionCombine.loiTrongQuaTrinhXuLy,
        typeCombine.error
      ))
    }
  }
  console.log('buoc cuoi')
  yield put(loadingTableQuanTriAction.Creators.hide());
}
export function* sagaXoaNguoiDung() {
  yield takeLatest(otherFunctionTypes.XOA_NGUOI_DUNG, xoaNguoiDung);
}

//function them nguoi dung o phan quan tri
function* themNguoiDung(action) {
  yield put(loadingTableQuanTriAction.Creators.display());
  const model = action.model;
  try {
    let respond = yield call(QuanLyNguoiDungService.themNguoiDung, model);
    if (respond.status === STATUS_CODE.SUCCESS) {
      yield put(alertAction.Creators.open(
        messageCombine.themTaiKhoanThanhCong(model.taiKhoan),
        null,
        typeCombine.success
      ))
      // yield action.layDuLieu();
    }
  } catch (error) {
    const err = { ...error };
    if (err?.response?.data) {
      yield put(alertAction.Creators.open(
        messageCombine.errorMessage(err?.response?.status),
        descriptionCombine.errorDescription(err?.response?.data?.content),
        typeCombine.error
      ))
    } else {
      yield put(alertAction.Creators.open(
        messageCombine.loiTrongQuaTrinhXuLy,
        descriptionCombine.loiTrongQuaTrinhXuLy,
        typeCombine.error
      ))
    }
  }
  yield put(loadingTableQuanTriAction.Creators.hide());
}
export function* sagaThemNguoiDung() {
  yield takeLatest(otherFunctionTypes.THEM_NGUOI_DUNG, themNguoiDung);
}
