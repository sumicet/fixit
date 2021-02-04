import {
    FETCH_TRADESPEOPLE,
    SET_RATING,
    SET_FILTERS_FOR_CUSTOMER,
    RESET_FILTERS_FOR_CUSTOMER,
} from '../actions/tradespeople';

const initialState = {
    unfiltered: [],
    all: [], //filtered
    filters: {
        occupationId: null,
        distance: 2,
        rating: null,
    },
};

const tradespeopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_FILTERS_FOR_CUSTOMER:
            return {
                ...state,
                all: [...state.unfiltered].filter(tp => tp.distance < 30000),
                filters: {
                    occupationId: null,
                    distance: 2,
                    rating: null,
                },
            };
        case SET_FILTERS_FOR_CUSTOMER:
            var customerFilteredAll = [...state.unfiltered];

            if (action.occupationId) {
                customerFilteredAll = customerFilteredAll.filter(tp =>
                    tp.occupationsIds.includes(action.occupationId)
                );
            }

            if (action.rating) {
                customerFilteredAll = customerFilteredAll.filter(
                    tp => tp.rating >= action.rating
                );
            }

            switch (action.distance) {
                case 0:
                    customerFilteredAll = customerFilteredAll.filter(
                        tp => tp.distance < 10000
                    );
                    break;
                case 1:
                    customerFilteredAll = customerFilteredAll.filter(
                        tp => tp.distance < 20000
                    );
                    break;
                case 3:
                    customerFilteredAll = [...state.unfiltered];
                    break;
                default:
                    customerFilteredAll = customerFilteredAll.filter(
                        tp => tp.distance < 30000
                    );
                    break;
            }

            return {
                ...state,
                all: customerFilteredAll,
                filters: {
                    occupationId: action.occupationId,
                    distance: action.distance,
                    rating: action.rating,
                },
            };
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
                all: all.filter(tp => tp.distance < 30000),
                unfiltered: all,
            };
        case SET_RATING:
            const updatedAll = [...state.all];
            const index = updatedAll.findIndex(
                tp => tp.userId === action.userId
            );
            updatedAll[index].rating = action.rating;
            updatedAll[index].ratingVotesAmount = action.ratingVotesAmount;

            const updatedUnfiltered = [...state.unfiltered];
            const indexUnfiltered = updatedUnfiltered.findIndex(
                tp => tp.userId === action.userId
            );
            updatedUnfiltered[index].rating = action.rating;
            updatedUnfiltered[index].ratingVotesAmount =
                action.ratingVotesAmount;

            return {
                ...state,
                all: updatedAll,
                unfiltered: updatedUnfiltered,
            };
        // case CHANGE_TRADESPERSON_NAME: TODO check if it's ok when changing names
        //     const updatedAllName = [...state.all];
        //     const indexName = updatedAllName.findIndex(
        //         tp => tp.userId === action.userId
        //     );
        //     updatedAllName[indexName].name = action.name;
        //     return {
        //         ...state,
        //         all: updatedAllName,
        //     };
        default:
            return state;
    }
};

export default tradespeopleReducer;
