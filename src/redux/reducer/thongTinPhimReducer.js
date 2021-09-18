import { createReducer } from "reduxsauce";
import { thongTinPhimTypes as Types } from "../types/typesCombine";

const INITIAL_STATE = { thongTinChiTietPhim:{}, };

const get = (state = INITIAL_STATE, action) => {
    let newState=state
    newState.thongTinChiTietPhim=action.thongTinChiTietPhim
    return {...newState}
};

const HANDLERS = {
  [Types.GET]: get,
};

export default createReducer(INITIAL_STATE, HANDLERS);