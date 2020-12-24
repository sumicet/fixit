export const SET_IN_APP_NOTIFICATION = 'SET_IN_APP_NOTIFICATION';
export const SET_IN_APP_NOTIFICATION_VISIBLE =
    'SET_IN_APP_NOTIFICATION_VISIBLE';

export const hideInAppNotification = () => {
    return async dispatch => {
        dispatch({
            type: SET_IN_APP_NOTIFICATION_VISIBLE,
            inAppNotificationVisible: false
        });
    };
};

export const setInAppNotification = (title, message, style) => {
    return async dispatch => {
        setTimeout(() => {
            dispatch(hideInAppNotification())
        }, 5000);
        dispatch({
            type: SET_IN_APP_NOTIFICATION,
            title,
            message,
            style
        });
    };
};

export const setInAppNotificationVisible = inAppNotificationVisible => {
    return {
        type: SET_IN_APP_NOTIFICATION_VISIBLE,
        inAppNotificationVisible,
    };
};
