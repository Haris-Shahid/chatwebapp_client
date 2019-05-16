import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

import AuthAction from '../../store/actions/authAction';
import ChatAction from '../../store/actions/chatAction';
import { connect } from 'react-redux';

import './style.css';
import UserList from '../../component/userList/index'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: ''
        }
    }
    componentDidMount() {
        if (localStorage.usertoken) {
            let decode = jwt_decode(localStorage.usertoken);
            if (decode.username) {
                this.props.addUser(decode)
                this.props.handleChatSockets(this.props.AuthReducer.socket, decode._id)
            }
        }
        this.updateState(this.props)
    }

    updateState(props) {
        this.setState({
            username: props.AuthReducer.username,
            email: props.AuthReducer.email
        })
    }

    componentWillReceiveProps(newProps) {
        this.updateState(newProps)
    }
    render() {
        return (
            <div className="row main-container" style={{ height: window.innerHeight - 20 }} >
                <div className='col-md-2 user-list-cont' >
                    <UserList />
                </div>
                <div className='col-md-10 section' >
                    <div className='siblingContainer' >
                        <div className='sibling-child' >
                            <div className='row' >
                                <div className='col-md-4 font-weight-bolder' >Username:</div>
                                <div className='col-md-8' >{this.state.username}</div>
                            </div>
                            <div className='row' >
                                <div className='col-md-4 font-weight-bolder' >Email:</div>
                                <div className='col-md-8' >{this.state.email}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: (u) => dispatch(AuthAction.addUser(u)),
        handleChatSockets: (io, uid) => dispatch(ChatAction.handleSockets(io, uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);