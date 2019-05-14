import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import ChatReducer from './chatReducer';

const RootReducer = combineReducers({
    AuthReducer,
    ChatReducer
});

export default RootReducer;