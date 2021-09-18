import { createReducer } from "reduxsauce";
import { modalTypes as Types } from "../types/typesCombine";

const INITIAL_STATE = { visible: false, src: "" };

const open = (state = INITIAL_STATE, action) => {
  let newState = state;
  newState.src = action.src;
  newState.visible = true;
  return { ...newState };
};

const close = (state = INITIAL_STATE, action) => {
  let newState = state;
  newState.src = "";
  newState.visible = false;
  return { ...newState };
};

const HANDLERS = {
  [Types.OPEN]: open,
  [Types.CLOSE]: close,
};

export default createReducer(INITIAL_STATE, HANDLERS);