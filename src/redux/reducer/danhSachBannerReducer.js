import { createReducer } from "reduxsauce";
import { danhSachBannerTypes as Types } from "../types/typesCombine";

const INITIAL_STATE = { listBanner: [], chosenBannerVideo: "" };

const get = (state = INITIAL_STATE, action) => {
  const newState = state;
  newState.listBanner = action.listBanner;
  return { ...newState };
};

const HANDLERS = {
  [Types.GET]: get,
};

export default createReducer(INITIAL_STATE, HANDLERS);
