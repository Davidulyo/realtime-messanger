import { pickChat } from './ActionCreators';
import * as Types from './ActionTypes';

const init = {
    someoneInSystem: false,
    profile: null,
    allUsers: null,
    pickedChat: null,
}


export const mainReducer = (state = init, {type, payload}) => {
    switch(type){
        case Types.SOMEONE_IN_SYSTEM : return {...state, someoneInSystem: payload.answer};
        case Types.SET_ALL_USERS : return {...state, allUsers: payload.data};
        case Types.SET_PROFILE : return {...state, profile: payload.data, someoneInSystem: true};
        case Types.PICK_CHAT : return {...state, pickedChat: payload.choice};
        case Types.LOG_OUT : return {allUsers: null, profile: null, someoneInSystem: false, pickedChat: null};
        default: return state;
    }
}