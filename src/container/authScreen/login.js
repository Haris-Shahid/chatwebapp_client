import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Paper, FormControl, InputLabel, Input, IconButton, InputAdornment, CircularProgress } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import './style.css';

import { connect } from "react-redux"
import AuthAction from '../../store/actions/authAction';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            password: '',
            email: '',
            error: ''
        }
    }
    handleChange(v, e) {
        this.setState({
            [v]: e.target.value
        })
    }

    handleSubmit() {
        const { email, password } = this.state;
        var validation = `${
            !email ? 'Please enter your email' :
                email.indexOf('@') === -1 || email.indexOf('.com') === -1 ? 'Please enter valid email id' :
                    !password ? 'Please enter password' : null}`
        if (validation === null || validation === "null") {
            this.setState({ error: null })
            this.props.logIn(this.state, this.props.history, this.props.socket)
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
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" className='input-field' type='text' value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
                            </FormControl>
                            <FormControl className='input-container'  >
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input id="password" className='input-field' type={this.state.showPassword ? 'text' : 'password'} value={this.state.password} onChange={(e) => this.handleChange('password', e)} endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="Toggle password visibility" onClick={() => this.setState({ showPassword: !this.state.showPassword })} >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                />
                            </FormControl>
                            {(this.state.error !== null || this.state.error !== 'null') && <div className='error-txt' >{this.state.error}</div>}
                            <button onClick={() => this.handleSubmit()} type="button" className="btn-primary btn-lg btn-block">Log In</button>
                            <div className='condition-Txt' >
                                Don't have an Account <Link to='/signup' >Sign Up</Link>
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
        logIn: (state, nav, socket) => dispatch(AuthAction.logIn(state, nav, socket)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);