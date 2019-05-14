import { LOADING_START, GOT_ERROR, USER_REGISTERED, USER_LOG_IN, ADD_SOCKET, GET_MESSAGES, GET_USERS } from '../actionTypes';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import socketIOClient from "socket.io-client";

export default class AuthAction {

    static connectSocket() {
        return dispatch => {
            const socket = socketIOClient('https://patienttracking.herokuapp.com');
            dispatch({
                type: ADD_SOCKET,
                socket
            })
        }
    }

    static signUp(user, nav) {
        return dispatch => {
            dispatch({
                type: LOADING_START
            })
            let authUser = {
                username: user.username,
                email: user.email,
                password: user.password
            }
            axios.post('auth/register', authUser)
                .then(res => {
                    if (res.data.error) {
                        dispatch({
                            type: GOT_ERROR,
                            error: res.data.error
                        })
                    } else {
                        dispatch({
                            type: USER_REGISTERED,
                            user: res.data.user
                        })
                        nav.goBack();
                    }
                }).catch(err => {
                    dispatch({
                        type: GOT_ERROR,
                        error: err
                    })
                })

        }
    }
    static logIn(user, nav, socket) {
        return dispatch => {
            dispatch({
                type: LOADING_START
            })
            let authUser = {
                email: user.email,
                password: user.password
            }
            axios.post('auth/login', authUser)
                .then(res => {
                    if (res.data.error) {
                        dispatch({
                            type: GOT_ERROR,
                            error: res.data.error
                        })
                    } else {
                        // console.log(res.data , '////////////')
                        // if(res.data.payload){
                            // localStorage.setItem('usertoken', res.data)
                            // let decode = jwt_decode(res.data, { header: true });
                            socket.on('all_Users', users => {
                                console.log(users, '///////////////')
                                dispatch({
                                    type: GET_USERS,
                                    allUsers: users
                                })
                            })
                            socket.on('all_chats', chats => {
                                console.log(chats, '///////////////')
                                dispatch({
                                    type: GET_MESSAGES,
                                    messages: chats
                                })
                            })
                            dispatch({
                                type: USER_LOG_IN,
                                decode: res.data.payload
                            })
                            nav.push('/profile')
                        // }
                    }
                })
                .catch(err => {
                    dispatch({
                        type: GOT_ERROR,
                        error: err
                    })
                })
        }
    }
}