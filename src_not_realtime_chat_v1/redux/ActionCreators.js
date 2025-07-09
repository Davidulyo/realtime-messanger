import * as Types from './ActionTypes'

export const someoneInSystem = (answer) => {
    return {
        type: Types.SOMEONE_IN_SYSTEM,
        payload: {answer},
    }
}

export const setProfile = (data) => {
    return {
        type: Types.SET_PROFILE,
        payload: {data},
    }
}

export const setAllUsers = (data) => {
    return {
        type: Types.SET_ALL_USERS,
        payload: {data},
    }
}

export const pickChat = (choice) => {
    return {
        type: Types.PICK_CHAT,
        payload: {choice},
    }
}

export const logout = () => {
    return {
        type: Types.LOG_OUT,
    }
}
