import { takeLatest, put, call } from "redux-saga/effects";
import { QuanLyPhimService } from "../../services/quanLyPhimService";
import { STATUS_CODE } from "../../utils/constants/settingSystem";
import {messageCombine,descriptionCombine,typeCombine} from '../../utils/constants/alertSystem'
import {
  otherFunctionTypes,
  danhSachBannerTypes,
  danhSachPhimTypes,
  quanTriPhimTypes,
} from "../types/typesCombine";
import {
  danhSachBannerAction,
  danhSachPhimAction,
  loadingTableQuanTriAction,
  quanTriPhimAction,
  alertAction
} from "../actions/actionCombine";

//function lay danh sach banner
function* layDanhSachBanner() {
  try {
    let { data, status } = yield call(QuanLyPhimService.layDanhSachBanner);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(danhSachBannerAction.Creators.get(data.content));
    }
  } catch (err) {
    yield put(alertAction.Creators.open(
      messageCombine.khongLayDuocDuLieu,
      descriptionCombine.khongLayDuocDuLieu,
      typeCombine.error
    ))
  }
}
export function* sagaLayDanhSachBanner() {
  yield takeLatest(danhSachBannerTypes.GET_SAGA, layDanhSachBanner);
}

//function lay danh sach phim tai trang chu
function* layDanhSachPhim() {
  try {
    let { data, status } = yield call(QuanLyPhimService.layDanhSachPhim);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(danhSachPhimAction.Creators.get(data.content));
    }
  } catch (err) {
    yield put(alertAction.Creators.open(
      messageCombine.khongLayDuocDuLieu,
      descriptionCombine.khongLayDuocDuLieu,
      typeCombine.error
    ))
  }
}
export function* sagaLayDanhSachPhim() {
  yield takeLatest(danhSachPhimTypes.GET_SAGA, layDanhSachPhim);
}

//Lay thong tin phim o phan chi tiet
// function* layThongTinPhim(action) {
//   const { id } = action.id;
//   yield put(loadingAction.Creators.display());
//   try {
//     let { data, status } = yield call(QuanLyPhimService.layThongTinPhim, id);
//     if (status === STATUS_CODE.SUCCESS) {
//       yield put(thongTinPhimAction.Creators.get(data.content));
//     } else {
//       alert("Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ");
//     }
//   } catch (err) {
//     alert("Có lỗi xảy ra trong quá trình lấy dữ liệu từ máy chủ");
//   }
//   yield put(loadingAction.Creators.hide());
// }
// export function* sagaLayThongTinPhim() {
//   yield takeLatest(thongTinPhimTypes.GET_SAGA, layThongTinPhim);
// }

//function lay danh sach phim phan trang tai phan quan tri
function* layDanhSachPhimPhanTrang(action) {
  yield put(loadingTableQuanTriAction.Creators.display());
  const model = action.model;
  try {
    let { data, status } = yield call(
      QuanLyPhimService.layDanhSachPhimPhanTrang,
      model
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(quanTriPhimAction.Creators.get(data.content));
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
export function* sagaLayDanhSachPhimPhanTrang() {
  yield takeLatest(quanTriPhimTypes.GET_SAGA, layDanhSachPhimPhanTrang);
}

//function xoa phim o muc quan tri
function* xoaPhim(action) {
  yield put(loadingTableQuanTriAction.Creators.display());
  const maPhim = action.maPhim;
  try {
    let { status } = yield call(QuanLyPhimService.xoaPhim, maPhim);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(alertAction.Creators.open(
        messageCombine.xoaPhimThanhCong(maPhim),
        null,
        typeCombine.success
      ))
      yield action.layDuLieu();
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
export function* sagaXoaPhim() {
  yield takeLatest(otherFunctionTypes.XOA_PHIM, xoaPhim);
}

//function them phim moi tai phan quan tri
function* themPhim(action) {
  yield put(loadingTableQuanTriAction.Creators.display());
  const model = action.model;
  try {
    let { status } = yield call(QuanLyPhimService.themPhimUploadHinh, model);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(alertAction.Creators.open(
        messageCombine.themPhimThanhCong(model.get("tenPhim")),
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
export function* sagaThemPhim() {
  yield takeLatest(otherFunctionTypes.THEM_PHIM, themPhim);
}

//function chinh sua phim tai phan quan tri
function* capNhatPhim(action) {
  yield put(loadingTableQuanTriAction.Creators.display());
  const model = action.model;
  try {
    let { status } = yield call(QuanLyPhimService.capNhatPhimUpload, model);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(alertAction.Creators.open(
        messageCombine.capNhatPhimThanhCong(model.get("tenPhim")),
        null,
        typeCombine.success
      ))
      yield action.layDuLieu();
    }
  } catch (error) {
    const err = { ...error };
    if (err.response) {
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
export function* sagaCapNhatPhim() {
  yield takeLatest(otherFunctionTypes.CAP_NHAT_PHIM, capNhatPhim);
}
