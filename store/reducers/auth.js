import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    LOG_IN,
    UPDATE_TOKEN,
    AUTO_LOG_IN,
    SIGN_OUT,
    SET_IS_LOGGED_IN_TO_TRUE,
    SET_USER_TYPE,
    SIGN_UP,
    VERIFY_EMAIL,
} from '../actions/auth';

const initialState = {
    isLoggedIn: false,
    userId: null,
    token: null,
    userType: null,
    hasVerifiedEmail: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTO_LOG_IN:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                userId: action.userId,
                token: action.token,
            };
        case LOG_IN:
            return {
                ...state,
                userId: action.userId,
                token: action.token,
            };
        case SIGN_UP:
            return {
                ...state,
                userId: action.userId,
                token: action.token,
                userType: action.userType
            };
        case SET_IS_LOGGED_IN_TO_TRUE:
            return {
                ...state,
                isLoggedIn: true,
            };
        case UPDATE_TOKEN:
            return {
                ...state,
                token: action.token,
            };
        case SIGN_OUT:
            return initialState;
        case SET_USER_TYPE:
            return {
                ...state,
                userType: action.userType,
            };
        case VERIFY_EMAIL:
            return {
                ...state,
                hasVerifiedEmail: action.value,
            }
        default:
            return state;
    }
};

export default authReducer;
