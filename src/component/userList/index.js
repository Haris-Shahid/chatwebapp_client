import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css'

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className='list-group listScroll' style={{ maxHeight: window.innerHeight - 20 }}  >
                {
                    this.props.allUsers.length !== 0 ?
                        this.props.allUsers.map((v, i) => {
                            if (v._id !== this.props._id) {
                                return (<NavLink key={i} className='list-group-item' to={{
                                    pathname: `/inbox/${v.username}`,
                                    state: { selectedUser: v }
                                }} >{v.username}</NavLink>)
                            }
                            return null;
                        }) : null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        socket: state.AuthReducer.socket,
        _id: state.AuthReducer._id,
        allUsers: state.ChatReducer.allUsers
    }
}

export default connect(mapStateToProps, {})(UserList);