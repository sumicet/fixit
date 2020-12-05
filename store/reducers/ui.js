import { SET_STATUS_BAR_STYLE } from '../actions/ui';

const initialState = {
    barStyle: 'light',
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUS_BAR_STYLE:
            return {
                ...state,
                barStyle: action.barStyle,
            };
        default:
            return state;
    }
};

export default uiReducer;
