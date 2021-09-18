import { createReducer } from "reduxsauce";
import { quanTriNguoiDungTypes as Types } from "../types/typesCombine";

const INITIAL_STATE = { danhSachNguoiDungQuanTri:{} };

const get = (state = INITIAL_STATE, action) => {
    let newState=state
    newState.danhSachNguoiDungQuanTri=action.danhSachNguoiDungQuanTri
    return {...newState}
};

const HANDLERS = {
  [Types.GET]: get,
};

export default createReducer(INITIAL_STATE, HANDLERS);