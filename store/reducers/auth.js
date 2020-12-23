import {
    LOG_IN,
    UPDATE_TOKEN,
    AUTO_LOG_IN,
    SIGN_OUT,
    SET_IS_LOGGED_IN,
    SET_USER_TYPE,
    SIGN_UP,
    RESEND_EMAIL_TIMER,
    CHANGE_EMAIL,
    CHANGE_HAS_VERIFIED_EMAIL,
} from '../actions/auth';

const initialState = {
    isLoggedIn: false,
    userId: null,
    token: null,
    userType: null,
    hasVerifiedEmail: true,
    email: null,
    resendEmailTimer: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_EMAIL:
            return {
                ...state,
                email: action.email,
            };
        case AUTO_LOG_IN:
            return {
                ...state,
                isLoggedIn: true,
                userId: action.userId,
                token: action.token,
                email: action.email,
                userType: action.userType,
            };
        case LOG_IN:
            console.log('done with log in');
            return {
                ...state,
                userId: action.userId,
                token: action.token,
                email: action.email,
                userType: action.userType,
            };
        case SIGN_UP:
            return {
                ...state,
                userId: action.userId,
                token: action.token,
                userType: action.userType,
                email: action.email,
            };
        case SET_IS_LOGGED_IN:
            console.log('done with set is logged in to true');
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
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
        case CHANGE_HAS_VERIFIED_EMAIL:
            return {
                ...state,
                hasVerifiedEmail: action.hasVerifiedEmail,
            };
        case RESEND_EMAIL_TIMER:
            return {
                ...state,
                resendEmailTimer: action.date,
            };
        default:
            return state;
    }
};

export default authReducer;
