import { createReducer } from "reduxsauce";
import {danhSachCumRapTheoHeThongTypes as Types} from '../types/typesCombine'

const INITIAL_STATE = { listDanhSachCumRapTheoHeThong:[] };

const get=(state=INITIAL_STATE,action)=>{
    const newState = state;
    newState.listDanhSachCumRapTheoHeThong=action.listDanhSachCumRapTheoHeThong;
    newState.pickedID=action.listDanhSachCumRapTheoHeThong[0].maCumRap;
    return { ...newState };
}

const HANDLERS = {
  [Types.GET]: get,
};

export default createReducer(INITIAL_STATE, HANDLERS)