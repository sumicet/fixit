export const SET_STATUS_BAR_STYLE = 'SET_STATUS_BAR_STYLE';

export const setStatusBarStyle = barStyle => {
    return {
        type: SET_STATUS_BAR_STYLE,
        barStyle,
    };
};
