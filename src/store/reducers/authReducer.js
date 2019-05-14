import { LOADING_START, GOT_ERROR, USER_REGISTERED, USER_LOG_IN, ADD_SOCKET } from '../actionTypes';

const initialState = {
    username: '',
    email: '',
    _id: '',
    error: null,
    loading: false,
    socket: null,
}

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING_START:
            return { ...state, loading: true, error: null }
        case USER_REGISTERED:
            return { ...state, ...action.user, loading: false, error: null }
        case USER_LOG_IN:
        console.log(action.decode)
            return { ...state, ...action.decode, loading: false, error: null }
        case GOT_ERROR:
            return { ...state, error: action.error, loading: false }
        case ADD_SOCKET:
            return { ...state, socket: action.socket }
        default:
            return state;
    }
}