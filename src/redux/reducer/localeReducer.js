import { createReducer } from "reduxsauce";
import {localeTypes as Types} from '../types/typesCombine'

const INITIAL_STATE = { value:'en' };

const change=(state=INITIAL_STATE,action)=>{
    let newState=state
    newState.value=action.value
    return {...newState}
}

const HANDLERS = {
  [Types.CHANGE]: change,
};

export default createReducer(INITIAL_STATE, HANDLERS)