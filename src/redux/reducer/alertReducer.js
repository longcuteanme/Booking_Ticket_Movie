import { createReducer } from "reduxsauce";
import { alertTypes as Types } from "../types/typesCombine";

const INITIAL_STATE = { message: "", description: "", type: "info", open: false };

const open = (state = INITIAL_STATE, action) => {
  const { message, description, alertType } = action;
  const newState = state;
  newState.message = message;
  newState.description = description;
  newState.type = alertType;
  newState.open = true;
  return { ...newState };
};

const close = (state = INITIAL_STATE, action) => {
  const newState = state;
  newState.message = "";
  newState.description = "";
  newState.type = "info";
  newState.open = false;
  return { ...newState };
};

const HANDLERS = {
  [Types.OPEN]: open,
  [Types.CLOSE]: close,
};

export default createReducer(INITIAL_STATE, HANDLERS);
