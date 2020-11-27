import { SET_STATUS_BAR_STYLE } from '../actions/ui';
import Color from '../../constants/Color';

const initialState = {
    barStyle: 'dark-content',
    backgroundColor: Color.primaryColor
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUS_BAR_STYLE:
            return {
                barStyle: action.barStyle,
                backgroundColor: action.backgroundColor
            };
        default:
            return state;
    }
};

export default uiReducer;
