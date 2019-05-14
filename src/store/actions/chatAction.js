import { GET_MESSAGES, GET_USERS, UPDATE_USER } from '../actionTypes';

export default class ChatAction {
    static sendMessage(chat, io) {
        return dispatch => {
            io.emit('message_send', chat);
        }
    }
    static handleSockets(socket) {
        return dispatch => {
            socket.emit('getUsersAndChats')
            socket.on('all_Users', users => {
                dispatch({ type: GET_USERS, allUsers: users })
            })
            socket.on('all_chats', chats => {
                dispatch({ type: GET_MESSAGES, messages: chats })
            })
            socket.on('newRegisterUserAdded', (user) => {
                dispatch({ type: UPDATE_USER, user })
            })
        }
    }

}