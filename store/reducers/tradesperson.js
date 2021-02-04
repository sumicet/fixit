import {
    ADD_QUOTED_JOB,
    FETCH_TRADESPERSON_INFO,
    SET_TRADESPERSON_INFO,
    SET_TRADESPERSON_REQUESTS,
} from '../actions/tradesperson';

const initialState = {
    occupationsIds: [],
    streetAddress: {
        line1: null,
        place_id: null,
    },
    experienceId: null,
    insurance: null,
    propertyTypesIds: [],
    profilePicture: null,
    phoneNumber: null,
    requests: [],
};

const tradespersonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRADESPERSON_INFO:
            return {
                ...state,
                occupationsIds: action.occupationsIds,
                streetAddress: action.streetAddress,
                experienceId: action.experienceId,
                insurance: action.insurance,
                propertyTypesIds: action.propertyTypesIds,
                profilePicture: action.profilePicture,
                phoneNumber: action.phoneNumber,
                recommendedByIds: action.recommendedByIds,
                rating: action.rating,
                ratingVotesAmount: action.ratingVotesAmount,
                contactsIds: action.contactsIds,
            };
        case FETCH_TRADESPERSON_INFO:
            return {
                ...state,
                occupationsIds: action.occupationsIds,
                streetAddress: action.streetAddress,
                experienceId: action.experienceId,
                insurance: action.insurance,
                propertyTypesIds: action.propertyTypesIds,
                profilePicture: action.profilePicture,
                phoneNumber: action.phoneNumber,
                recommendedByIds: action.recommendedByIds,
                rating: action.rating,
                ratingVotesAmount: action.ratingVotesAmount,
                contactsIds: action.contactsIds,
                requests: action.requests,
            };
        default:
            return state;
    }
};

export default tradespersonReducer;
