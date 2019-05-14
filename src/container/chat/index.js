import React, { Component } from 'react';

import { connect } from 'react-redux';
import UserList from '../../component/userList/index';
import './style.css';

import ChatAction from '../../store/actions/chatAction';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.socket = null;
        this.state = {
            message: '',
            messages: []
        }
    }

    componentDidMount() {
        this.handleChatList(this.props.messages)
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    handleChatList(messages) {
        let chat = [];
        const { _id } = this.props.location.state.selectedUser;
        messages.map(v => {
            if (v.senderId === this.props._id || v.senderId === _id || v.receiverId === this.props._id || v.receiverId === _id) {
                chat.push(v)
            }
        })
        this.setState({
            messages: chat
        })
    }

    componentWillReceiveProps(props) {
        if (props.messages) {
            console.log(props.messages)
            this.handleChatList(props.messages)
        }
    }

    handleSubmit() {
        const { username, _id } = this.props.location.state.selectedUser;
        if (this.state.message) {
            let chat = {
                senderId: this.props._id,
                receiverId: _id,
                message: this.state.message,
                createdAt: new Date()
            }
            this.props.sendMessage(chat, this.props.socket)
            this.setState({
                message: ''
            })
        } else {
            alert('Type a message first')
        }
    }

    scrollToBottom = () => {
        this.scrl.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        const { username, _id } = this.props.location.state.selectedUser;
        return (
            <div className="row main-container" style={{ height: window.innerHeight - 20 }} >
                <div className='col-md-2 user-list-cont' >
                    <UserList />
                </div>
                <div className='col-md-10 section' >
                    <div className='section_child' >
                        <h3>Chat With {username}</h3>
                        <ul className="chat-list-cont" >
                            {
                                this.state.messages.length !== 0 ?
                                    this.state.messages.map((v, i) => {
                                        if (v.receiverId === _id && v.senderId === this.props._id) {
                                            return (
                                                <div key={i} style={{ textAlign: 'right' }} >
                                                    <li className="sender-chat" >{v.message}</li>
                                                </div>
                                            )
                                        }
                                        if (v.receiverId === this.props._id && v.senderId === _id) {
                                            return (
                                                <div key={i} >
                                                    <li className="receiver-chat" >{v.message}</li>
                                                </div>
                                            )
                                        }
                                    }) : null
                            }
                            < div ref={re => this.scrl = re} className='scrolltobottom' ></div>
                        </ul>
                    </div>
                    <div className='input_cont' >
                        <input onChange={(e) => this.setState({ message: e.target.value })} />
                        <button onClick={this.handleSubmit.bind(this)} >Send</button>
                    </div>
                </div>
            </div >

        )
    }
}

const mapStateToProps = state => {
    return {
        _id: state.AuthReducer._id,
        username: state.AuthReducer._id,
        socket: state.AuthReducer.socket,
        messages: state.ChatReducer.messages,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendMessage: (m, s) => dispatch(ChatAction.sendMessage(m, s))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);