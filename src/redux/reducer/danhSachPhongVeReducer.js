import { createReducer } from "reduxsauce";
import { danhSachPhongVeTypes as Types } from "../types/typesCombine";

const INITIAL_STATE = { thongTinPhim: {}, danhSachGhe: [] };

const get = (state = INITIAL_STATE, action) => {
  let newState = state;
  newState.thongTinPhim = action.thongTinPhim;
  newState.danhSachGhe = action.danhSachGhe;
  return { ...newState };
};

const HANDLERS = {
  [Types.GET]: get,
};

export default createReducer(INITIAL_STATE, HANDLERS);
