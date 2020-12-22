import {
    LOG_IN,
    UPDATE_TOKEN,
    AUTO_LOG_IN,
    SIGN_OUT,
    SET_IS_LOGGED_IN_TO_TRUE,
    SET_USER_TYPE,
    SIGN_UP,
    VERIFY_EMAIL,
    RESEND_EMAIL_TIMER,
    CHANGE_EMAIL
} from '../actions/auth';

const initialState = {
    isLoggedIn: false,
    userId: null,
    token: null,
    userType: null,
    hasVerifiedEmail: false,
    email: null,
    resendEmailTimer: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_EMAIL:
            return {
                ...state,
                email: action.email
            }
        case AUTO_LOG_IN:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                userId: action.userId,
                token: action.token,
                email: action.email,
            };
        case LOG_IN:
            return {
                ...state,
                userId: action.userId,
                token: action.token,
                email: action.email,
            };
        case SIGN_UP:
            return {
                ...state,
                userId: action.userId,
                token: action.token,
                userType: action.userType,
                email: action.email,
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
        case RESEND_EMAIL_TIMER:
            return {
                ...state,
                resendEmailTimer: action.date
            }
        default:
            return state;
    }
};

export default authReducer;
