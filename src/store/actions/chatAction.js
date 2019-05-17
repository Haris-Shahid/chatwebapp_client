import { GET_MESSAGES, GET_USERS, UPDATE_USER, UPDATE_CHAT, IMAGE_LOADER } from '../actionTypes';

export default class ChatAction {
    static sendMessage(chat, io) {
        return dispatch => {
            if (chat.chat.image) {
                dispatch({ type: IMAGE_LOADER })
            }
            io.emit('message_send', chat);
        }
    }
    static handleSockets(socket, uid) {
        return (dispatch, getState) => {
            socket.emit('getUsersAndChats', { userUid: uid })
            socket.on('all_Users', users => {
                dispatch({ type: GET_USERS, allUsers: users })
            })
            socket.on('all_chats', chats => {
                dispatch({ type: GET_MESSAGES, messages: chats })
            })
            socket.on('newRegisterUserAdded', (user) => {
                dispatch({ type: UPDATE_USER, user })
            })
            socket.on('update_chat', (chat) => {
                var flag = false;
                var messages = getState().ChatReducer.messages;
                messages.length !== 0 && messages.map(v => {
                    if (v._id === chat._id) {
                        flag = true;
                    }
                })
                if (!flag) {
                    dispatch({ type: UPDATE_CHAT, chat })
                }
            })
        }
    }

}