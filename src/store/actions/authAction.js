import { LOADING_START, GOT_ERROR, USER_REGISTERED, USER_LOG_IN, ADD_SOCKET, ADD_USER } from '../actionTypes';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import socketIOClient from "socket.io-client";

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};
export default class AuthAction {

    static connectSocket() {
        return dispatch => {
            const socket = socketIOClient('http://localhost:4000');
            dispatch({ type: ADD_SOCKET, socket })
        }
    }

    static addUser(user) {
        return dispatch => {
            dispatch({ type: ADD_USER, user })
        }
    }

    static signUp(user, nav, io) {
        return dispatch => {
            dispatch({
                type: LOADING_START
            })
            let authUser = {
                username: user.username,
                email: user.email,
                password: user.password
            }
            axios.post('http://localhost:4000/auth/register', authUser, axiosConfig)
                .then(res => {
                    if (res.data.error) {
                        dispatch({
                            type: GOT_ERROR,
                            error: res.data.error
                        })
                    } else {
                        dispatch({ type: USER_REGISTERED, user: res.data.user })
                        io.emit('newRegistration', res.data.user)
                        nav.goBack();
                    }
                }).catch(err => {
                    dispatch({ type: GOT_ERROR, error: err })
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
            axios.post('http://localhost:4000/auth/login', authUser, axiosConfig)
                .then(res => {
                    if (res.data.error) {
                        dispatch({ type: GOT_ERROR, error: res.data.error })
                    } else {
                        if (res.data.token) {
                            localStorage.setItem('usertoken', res.data.token)
                            let decode = jwt_decode(res.data.token);
                            dispatch({ type: USER_LOG_IN, decode: decode })
                        } else {
                            dispatch({ type: GOT_ERROR, error: 'Network error' })
                        }
                        nav.push('/profile')
                    }
                })
                .catch(err => {
                    dispatch({ type: GOT_ERROR, error: err })
                })
        }
    }
}