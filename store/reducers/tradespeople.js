import { FETCH_TRADESPEOPLE, SET_DISTANCES, SET_RATING } from '../actions/tradespeople';

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
                if (imgIndex !== -1) {
                    elem.profilePicture =
                        action.profilePictureList[imgIndex].profilePicture;
                } else {
                    elem.profilePicture = null;
                }

                all.push(elem);
            });
            return {
                ...state,
                all,
            };
        case SET_DISTANCES:
            return {
                ...state,
                all: action.all,
            };
        case SET_RATING:
            const updatedAll = [...state.all];
            const index = updatedAll.findIndex(tp => tp.userId === action.userId);
            updatedAll[index].rating = action.rating;
            updatedAll[index].ratingVotesAmount = action.ratingVotesAmount;
            return {
                ...state,
                all: updatedAll
            }
        default:
            return state;
    }
};

export default tradespeopleReducer;
