import { LOADING_START, GOT_ERROR, USER_REGISTERED, USER_LOG_IN, ADD_SOCKET, USER_LIST } from '../actionTypes';
import axios from 'axios';

export default class ChatAction{
    static sendMessage( chat, io ){
        return dispatch => {
            io.emit('message_send', chat);
        }
    }
}