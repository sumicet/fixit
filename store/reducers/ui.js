import {
    SET_GLOBAL_ALERT,
    SET_IN_APP_NOTIFICATION,
    SET_IN_APP_NOTIFICATION_VISIBLE,
    SET_IS_LOADING,
    HIDE_GLOBAL_ALERT,
    RESET_UI
} from '../actions/ui';

const initialState = {
    title: null,
    message: null,
    inAppNotificationVisible: false,
    style: null,
    isLoading: true,
    globalAlert: {
        title: null,
        message: null,
        onPress: null,
        style: null,
        globalAlertVisible: false
    },
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case HIDE_GLOBAL_ALERT:
            return {
                ...state,
                globalAlert: {
                    title: null,
                    message: null,
                    onPress: null,
                    style: null,
                    globalAlertVisible: false
                },
            }
        case SET_GLOBAL_ALERT:
            return {
                ...state,
                globalAlert: {
                    title: action.title,
                    message: action.message,
                    onPress: action.onPress,
                    style: action.style,
                    globalAlertVisible: true
                },
            };
        case SET_IN_APP_NOTIFICATION:
            return {
                ...state,
                title: action.title,
                message: action.message,
                inAppNotificationVisible: true,
                style: action.style,
            };
        case SET_IN_APP_NOTIFICATION_VISIBLE:
            return {
                ...state,
                inAppNotificationVisible: action.inAppNotificationVisible,
            };
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.value,
            };
        case RESET_UI:
            return initialState;
        default:
            return state;
    }
};

export default uiReducer;
