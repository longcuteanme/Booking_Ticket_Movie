import { createReducer } from "reduxsauce";
import { danhSachLichChieuTheoHeThongTypes as Types } from "../types/typesCombine";

const INITIAL_STATE = { listDanhSachLichChieuTheoHeThong: [], pickedIndex: 0 };

const get = (state = INITIAL_STATE, action) => {
  let newState=state
  newState.listDanhSachLichChieuTheoHeThong=action.listDanhSachLichChieuTheoHeThong
  newState.pickedIndex=0;
  return {...newState}
};

const changeIndex=(state = INITIAL_STATE, action) => {
  let newState=state
  newState.pickedIndex=action.pickedIndex
  return {...newState}
}

const HANDLERS = {
  [Types.GET]: get,
  [Types.CHANGE_INDEX]:changeIndex
};

export default createReducer(INITIAL_STATE, HANDLERS);
