import React, { Component } from 'react';

import { connect } from 'react-redux';
import UserList from '../../component/userList/index';
import './style.css';
import jwt_decode from 'jwt-decode';

import ChatAction from '../../store/actions/chatAction';
import AuthAction from '../../store/actions/authAction';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.socket = null;
        this.state = {
            message: '',
            messages: [],
            uploadImage: '',
            uploadImage1: '',
            imageStatus: false,
        }
    }

    componentDidMount() {
        this.handleChatList(this.props.messages)
        this.scrollToBottom();
        if (localStorage.usertoken) {
            let decode = jwt_decode(localStorage.usertoken);
            if (decode.username) {
                this.props.addUser(decode)
                this.props.handleChatSockets(this.props.socket, decode._id)
            }
        }
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    handleChatList(messages) {
        let chat = [];
        const { _id } = this.props.location.state.selectedUser;
        messages.forEach(v => {
            if (v.senderId === this.props._id || v.senderId === _id || v.receiverId === this.props._id || v.receiverId === _id) {
                chat.push(v)
            }
        })
        this.setState({
            messages: chat
        })
    }


    handleSubmit() {
        const { _id } = this.props.location.state.selectedUser;
        if (this.state.message || this.state.uploadImage) {
            let chat = {
                senderId: this.props._id,
                receiverId: _id,
                chat: {
                    message: this.state.message,
                    image: this.state.uploadImage1,
                },
                createdAt: new Date()
            }
            this.props.sendMessage(chat, this.props.socket)
            this.setState({
                message: '',
                uploadImage: '',
                imageStatus: false,
                uploadImage1: ''
            })
        } else {
            alert('Type a message first')
        }
    }

    uploadImage() {
        var file = document.getElementById('fileid');
        file.click();
        let that = this
        file.addEventListener('change', (e) => {
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0])
            reader.onloadend = function () {
                that.setState({ uploadImage: [reader.result], imageStatus: true })
            }
            this.setState({ uploadImage1: e.target.files[0] })
        });
    }

    scrollToBottom = () => {
        this.scrl.scrollIntoView({ behavior: "smooth" });
    }

    componentWillReceiveProps(props) {
        if (props.messages) {
            this.handleChatList(props.messages)
        }
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
                                                <div key={i} style={{ textAlign: 'right' }}  >
                                                    <div className="sender-chat" >
                                                        {v.chat.image && <img src={v.chat.image} alt='there is network issue' />}
                                                        {v.chat.message && <li>{v.chat.message}</li>}

                                                    </div>
                                                </div>
                                            )
                                        }
                                        if (v.receiverId === this.props._id && v.senderId === _id) {
                                            return (
                                                <div key={i} >
                                                    <div className="receiver-chat" >
                                                        {v.chat.image && <img src={v.chat.image} alt='there is network issue' />}
                                                        {v.chat.message && <li>{v.chat.message}</li>}
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return null;
                                    }) : null
                            }
                            < div ref={re => this.scrl = re} className='scrolltobottom' ></div>
                        </ul>
                        <div className='image-container' style={{ display: this.state.imageStatus ? 'block' : 'none' }} >
                            <button onClick={() => this.setState({ uploadImage: '', imageStatus: false, uploadImage1: '' })} style={{ display: this.state.imageStatus ? 'block' : 'none' }} >X</button>
                            <img alt='image is not loaded' src={this.state.uploadImage} className='message-image' style={{ display: this.state.imageStatus ? 'block' : 'none' }} />
                        </div>
                    </div>
                    <div className='input_cont' >
                        <textarea rows={1} onChange={(e) => this.setState({ message: e.target.value })} value={this.state.message} ></textarea>
                        <button onClick={this.handleSubmit.bind(this)} >Send</button>
                        <button type='file' onClick={this.uploadImage.bind(this)} >Image Upload</button>
                    </div>
                    <input id='fileid' type='file' name='filename' accept="image/png" hidden={true} />
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
        sendMessage: (m, s) => dispatch(ChatAction.sendMessage(m, s)),
        addUser: (u) => dispatch(AuthAction.addUser(u)),
        handleChatSockets: (io, uid) => dispatch(ChatAction.handleSockets(io, uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);