import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './style.css';

class Navbar extends Component {

    logout(e) {
        e.preventDefault();
        localStorage.removeItem('usertoken');
        this.props.history.push('/');
    }

    render() {
        const authNav = (
            <div className='navbar-nav center-heading' >
                <div className='navbar-brand' >Welcome to One-One Chat</div>
            </div>
        )
        const userNav = (
            <div className='navbar-nav nav-width' >
                <div className='navbar-item' >
                    <div className='navbar-brand' >Welcome </div>
                </div>
                <div className='navbar-item right-nav' >
                    <a href='javascript:void(0)' onClick={this.logout.bind(this)} className='nav-link' >Logout</a>
                </div>
            </div>
        )
        return (
            <div className='navbar navbar-expand-lg navbar-dark bg-dark' >
                {localStorage.usertoken ? userNav : authNav}
            </div>
        );
    }
}

export default withRouter(Navbar);