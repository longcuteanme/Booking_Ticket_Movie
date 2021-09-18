import { createReducer } from "reduxsauce";
import { thongTinHeThongRapTypes as Types } from "../types/typesCombine";

const INITIAL_STATE = { listHeThongRap: [] };

const get = (state = INITIAL_STATE, action) => {
  let newState = state;
  newState.listHeThongRap = action.listHeThongRap;
  return { ...newState };
};

const HANDLERS = {
  [Types.GET]: get,
};

export default createReducer(INITIAL_STATE, HANDLERS);