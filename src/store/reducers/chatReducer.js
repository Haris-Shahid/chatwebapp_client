import { GET_MESSAGES, GET_USERS } from '../actionTypes';

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
        default:
            return state;
    }
}