import { createReducer } from "reduxsauce";
import { thongTinTaiKhoanTypes as Types } from "../types/typesCombine";

const INITIAL_STATE = { thongTinTaiKhoan:{} };

const get = (state = INITIAL_STATE, action) => {
    let newState=state
    newState.thongTinTaiKhoan=action.thongTinTaiKhoan
    return {...newState}
};

const HANDLERS = {
  [Types.GET]: get,
};

export default createReducer(INITIAL_STATE, HANDLERS);