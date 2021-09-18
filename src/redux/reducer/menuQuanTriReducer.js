import { createReducer } from "reduxsauce";
import {menuQuanTriTypes as Types} from '../types/typesCombine'

const INITIAL_STATE = { openKeys:[] };

const set=(state=INITIAL_STATE,action)=>{
    let newState=state
    newState.openKeys=action.openKeys
    return {...newState}
}

const HANDLERS = {
  [Types.SET]: set,
};

export default createReducer(INITIAL_STATE, HANDLERS)