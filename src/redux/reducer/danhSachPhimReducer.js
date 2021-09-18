import { createReducer } from "reduxsauce";
import {danhSachPhimTypes as Types} from '../types/typesCombine'

const INITIAL_STATE = { danhSachPhim:[] };

const get=(state=INITIAL_STATE,action)=>{
    const newState=state
    newState.danhSachPhim=action.danhSachPhim
    return {...newState}
}

const HANDLERS = {
  [Types.GET]: get,
};

export default createReducer(INITIAL_STATE, HANDLERS)
