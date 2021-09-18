import { createReducer } from "reduxsauce";
import {loadingTypes as Types} from '../types/typesCombine'

const INITIAL_STATE = { loading: false };

const display=(state=INITIAL_STATE,action)=>{
    const newState=state;
    newState.loading=true;
    return {...newState};
}

const hide=(state=INITIAL_STATE,action)=>{
    const newState=state;
    newState.loading=false;
    return {...newState};
}

const HANDLERS = {
  [Types.DISPLAY]: display,
  [Types.HIDE]: hide,
};

export default createReducer(INITIAL_STATE, HANDLERS)
