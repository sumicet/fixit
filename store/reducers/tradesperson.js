import { SET_TRADESPERSON_INFO } from '../actions/tradesperson';

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
};

const tradespersonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRADESPERSON_INFO:
            return {
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
        default:
            return state;
    }
};

export default tradespersonReducer;
