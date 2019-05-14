import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';

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
        // let decode = jwt_decode(localStorage.usertoken);
        this.setState({
            username: this.props.AuthReducer.username,
            email: this.props.AuthReducer.email
        })
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

export default connect(mapStateToProps, {})(Profile);