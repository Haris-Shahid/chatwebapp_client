import React, { Component } from 'react';

import { BrowserRouter, Route, NavLink, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import { connect } from 'react-redux';
import AuthAction from './store/actions/authAction';
import Signup from './container/authScreen/signup';
import Login from './container/authScreen/login';
import Profile from './container/profile'
import Chat from './container/chat';

import Navbar from './component/navbar/index';

class AllRoutes extends Component {

    constructor(props) {
        super(props);
    }
    
    componentWillMount(){
        this.props.connectSocket()
    }

    render() {
        return (
            <BrowserRouter>
                <Navbar />
                <div>
                    <Route path='/' exact component={Login} />
                    <Route path='/signup' exact component={Signup} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/inbox/:username' component={Chat} />
                </div>

            </BrowserRouter>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        connectSocket: () => dispatch(AuthAction.connectSocket())
    }
}

export default connect(null, mapDispatchToProps)(AllRoutes);