import { FETCH_TRADESPEOPLE } from '../actions/tradespeople';

const initialState = {
    all: [],
};

const tradespeopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRADESPEOPLE:
            const all = [];
            action.tradespeopleData.forEach(elem => {
                const imgIndex = action.profilePictureList.findIndex(
                    img => img.userId === elem.userId
                );
                if(imgIndex !== -1) {
                    elem.profilePicture = action.profilePictureList[imgIndex].profilePicture;
                } else {
                    elem.profilePicture = null;
                }
                
                all.push(elem);
            });
            return {
                ...state,
                all,
            };
        default:
            return state;
    }
};

export default tradespeopleReducer;
