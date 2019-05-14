import { GET_MESSAGES, GET_USERS, UPDATE_USER } from '../actionTypes';

const initialState = {
    messages: [],
    allUsers: []
}

export default function ChatReducer(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return { ...state, messages: action.messages }
        case GET_USERS:
            return state = { ...state, allUsers: action.allUsers }
        case UPDATE_USER:
            return state = { ...state, allUsers: [...state.allUsers, action.user] }
        default:
            return state;
    }
}