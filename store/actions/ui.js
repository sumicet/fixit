export const SET_STATUS_BAR_STYLE = 'SET_STATUS_BAR_STYLE';

export const setStatusBarStyle = (
    barStyle,
    backgroundColor
) => {
    return {
        type: SET_STATUS_BAR_STYLE,
        barStyle,
        backgroundColor
    }
};