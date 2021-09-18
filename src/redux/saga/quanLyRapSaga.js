import { takeLatest, put, call } from "redux-saga/effects";
import { QuanLyRapService } from "../../services/quanLyRapService";
import { STATUS_CODE } from "../../utils/constants/settingSystem";
import {messageCombine,descriptionCombine,typeCombine} from '../../utils/constants/alertSystem'
import {
  thongTinHeThongRapTypes,
  danhSachLichChieuTheoHeThongTypes,
  thongTinPhimTypes,
  danhSachCumRapTheoHeThongTypes,
} from "../types/typesCombine";
import {
  loadingAction,
  loadingTablePhimAction,
  thongTinHeThongRapAction,
  danhSachLichChieuTheoHeThongAction,
  thongTinPhimAction,
  danhSachCumRapTheoHeThongAction,
  alertAction
} from "../actions/actionCombine";

//Function lay thong tin he thong rap
function* layThongTinHeThongRap(action) {
  yield put(loadingTablePhimAction.Creators.display());
  try {
    let { data, status } = yield call(QuanLyRapService.layThongTinHeThongRap);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(thongTinHeThongRapAction.Creators.get(data.content));
      if (action?.chucNang === "layThongTinLichChieuPhim") {
        yield put(
          danhSachLichChieuTheoHeThongAction.Creators.getSaga(
            data.content[0].maHeThongRap
          )
        );
      }
    }
  } catch (err) {
    yield put(alertAction.Creators.open(
      messageCombine.khongLayDuocDuLieu,
      descriptionCombine.khongLayDuocDuLieu,
      typeCombine.error
    ))
  }
  yield put(loadingTablePhimAction.Creators.hide());
}

export function* sagaLayThongTinHeThongRap() {
  yield takeLatest(thongTinHeThongRapTypes.GET_SAGA, layThongTinHeThongRap);
}

//function lay thong tin cum rap theo he thong
function* layThongTinCumRapTheoHeThong(action) {
  const maHeThongRap = action.maHeThongRap;
  try {
    let { data, status } = yield call(
      QuanLyRapService.layThongTinCumRapTheoHeThong,
      maHeThongRap
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(danhSachCumRapTheoHeThongAction.Creators.get(data.content));
    }
  } catch (err) {
    yield put(alertAction.Creators.open(
      messageCombine.khongLayDuocDuLieu,
      descriptionCombine.khongLayDuocDuLieu,
      typeCombine.error
    ))
  }
}

export function* sagaLayThongTinCumRapTheoHeThong() {
  yield takeLatest(
    danhSachCumRapTheoHeThongTypes.GET_SAGA,
    layThongTinCumRapTheoHeThong
  );
}

//Lay thong tin lich chieu cua he thong rap
function* layThongTinLichChieuHeThongRap(action) {
  yield put(loadingTablePhimAction.Creators.display());
  const maHeThongRap = action.maHeThongRap;
  try {
    let { data, status } = yield call(
      QuanLyRapService.layThongTinLichChieuHeThongRap,
      maHeThongRap
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(
        danhSachLichChieuTheoHeThongAction.Creators.get(
          data.content[0].lstCumRap
        )
      );
    }
  } catch (err) {
    yield put(alertAction.Creators.open(
      messageCombine.khongLayDuocDuLieu,
      descriptionCombine.khongLayDuocDuLieu,
      typeCombine.error
    ))
  }
  yield put(loadingTablePhimAction.Creators.hide());
}

export function* sagaLayThongTinLichChieuHeThongRap() {
  yield takeLatest(
    danhSachLichChieuTheoHeThongTypes.GET_SAGA,
    layThongTinLichChieuHeThongRap
  );
}

//function lay thong tin lich chieu phim
function* layThongTinLichChieuPhim(action) {
  yield put(loadingAction.Creators.display());
  const maPhim = action.maPhim;
  try {
    let { data, status } = yield call(
      QuanLyRapService.layThongTinLichChieuPhim,
      maPhim
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put(thongTinPhimAction.Creators.get(data.content));
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

export function* sagaLayThongTinLichChieuPhim() {
  yield takeLatest(thongTinPhimTypes.GET_SAGA, layThongTinLichChieuPhim);
}
