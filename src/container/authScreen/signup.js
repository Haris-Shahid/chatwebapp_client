import React, { Component } from 'react';

import { Paper, FormControl, InputLabel, Input, CircularProgress } from '@material-ui/core';
import './style.css';

import { connect } from "react-redux"
import AuthAction from '../../store/actions/authAction';

class Signup extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: ''
        }
    }

    handleChange(v, e) {
        if (v === 'username') {
            let regrex = /^(?:\w+\W+){0,2}(?:\w+)$/;
            if (e.target.value.match(regrex) !== null) {
                this.setState({ [v]: e.target.value })
            } else {
                if (e.target.value.length === 0) {
                    this.setState({ [v]: '' })
                }
            }
        } else {
            this.setState({
                [v]: e.target.value
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const { username, email, password, confirmPassword } = this.state;
        var validation = `${
            !username ? 'Please enter Username' :
                !email ? 'Please enter your email' :
                    email.indexOf('@') === -1 || email.indexOf('.com') === -1 ? 'Please enter valid email id' :
                        !password ? 'Please enter password' :
                            password.length < 6 ? 'Enter password must contain at least 6 characters' :
                                !confirmPassword ? 'Please enter Retype password to confirm your password' :
                                    confirmPassword !== password ? "Your password doesn't match" : null}`
        if (validation === null || validation === "null") {
            this.setState({ error: null })
            this.props.signUp(this.state, this.props.history, this.props.socket)
        } else {
            this.setState({ error: validation })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            this.setState({
                error: nextProps.error
            })
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.loading ? <CircularProgress className='loader' /> :
                        <Paper className='paper-center' elevation={1}>
                            <FormControl className='input-container' >
                                <InputLabel htmlFor="namel">Username</InputLabel>
                                <Input id="namel" className='input-field' type='text' value={this.state.username} onChange={(e) => this.handleChange('username', e)} />
                            </FormControl>
                            <FormControl className='input-container' >
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" className='input-field' type='text' value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
                            </FormControl>
                            <FormControl className='input-container' >
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" className='input-field' type='password' value={this.state.password} onChange={(e) => this.handleChange('password', e)} />
                            </FormControl>
                            <FormControl className='input-container' >
                                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                <Input id="confirmPassword" className='input-field' type='password' value={this.state.confirmPassword} onChange={(e) => this.handleChange('confirmPassword', e)} />
                            </FormControl>
                            {(this.state.error !== null || this.state.error !== 'null') && <div className='error-txt' >{this.state.error}</div>}
                            <button onClick={(e) => this.handleSubmit(e)} type="button" className="btn-primary btn-lg btn-block btn-auth">Sign Up</button>
                            <div className='condition-Txt' >
                                Already have an Account <button className='btn btn-transparent login-btn' onClick={() => this.props.history.goBack()} >Log In</button>
                            </div>
                        </Paper>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.AuthReducer.loading,
        error: state.AuthReducer.error,
        socket: state.AuthReducer.socket,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (state, nav, io) => dispatch(AuthAction.signUp(state, nav, io)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);