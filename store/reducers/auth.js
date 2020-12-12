import { LOG_IN } from '../actions/auth';

const initialState = {
    isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isLoggedIn: true,
            };
        default:
            return state;
    }
};

export default authReducer;
