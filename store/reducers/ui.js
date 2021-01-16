import { SET_IN_APP_NOTIFICATION, SET_IN_APP_NOTIFICATION_VISIBLE, SET_IS_LOADING } from '../actions/ui';

const initialState = {
    title: null,
    message: null,
    inAppNotificationVisible: false,
    style: null,
    isLoading: true,
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IN_APP_NOTIFICATION:
            return {
                ...state,
                title: action.title,
                message: action.message,
                inAppNotificationVisible: true,
                style: action.style
            };
        case SET_IN_APP_NOTIFICATION_VISIBLE:
            return {
                ...state,
                inAppNotificationVisible: action.inAppNotificationVisible,
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.value
            }
        default:
            return state;
    }
};

export default uiReducer;
