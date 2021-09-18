import { createReducer } from "reduxsauce";
import { quanTriPhimTypes as Types } from "../types/typesCombine";

const INITIAL_STATE = { danhSachPhimQuanTri:{} };

const get = (state = INITIAL_STATE, action) => {
    let newState=state
    newState.danhSachPhimQuanTri=action.danhSachPhimQuanTri
    return {...newState}
};

const HANDLERS = {
  [Types.GET]: get,
};

export default createReducer(INITIAL_STATE, HANDLERS);