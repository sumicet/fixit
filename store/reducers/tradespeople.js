import { FETCH_TRADESPEOPLE } from '../actions/tradespeople';

const initialState = {
    all: [],
};

const tradespeopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRADESPEOPLE:
            (action.tradespeopleData).forEach(elem => {
                console.log(action.profilePictureList)
                const imgIndex = (action.profilePictureList).findIndex(
                    img => img.userId === elem.userId
                );
                elem.profilePicture = action.profilePictureList[imgIndex];
                console.log(elem);
            });
            return {};
        default:
            return state;
    }
};

export default tradespeopleReducer;
