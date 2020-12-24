import { ADD_COMMENT, FETCH_REVIEWS } from '../actions/reviews';

const initialState = {
    all: {},
};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            const updatedAll = [...updatedAll];
            const index = updatedAll.findIndex(
                elem =>
                    elem.tradespersonId === action.tradespersonId &&
                    elem.userId === action.userId
            );
            if (index === -1) {
                updatedAll.push({
                    tradespersonId: action.tradespersonId,
                    userId: action.userId,
                    rating: action.rating,
                    comment: action.comment,
                });
            } else {
                updatedAll[index] = {
                    tradespersonId: action.tradespersonId,
                    userId: action.userId,
                    rating: action.rating,
                    comment: action.comment,
                };
            }

            return {
                ...state,
                all: updatedAll,
            };
        case FETCH_REVIEWS:
            return {
                ...state,
                all: action.all,
            };
        default:
            return state;
    }
};

export default reviewsReducer;
