import { SET_TRADESPERSON_INFO } from '../actions/tradesperson';

const initialState = {
    name: null,
    occupationsIds: [],
    streetAddress: null,
    experienceId: null,
    insurance: null,
    propertyTypesIds: [],
    profilePicture: null,
    phoneNumber: null,
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRADESPERSON_INFO:
            return {
                name: action.name,
                occupationsIds: action.occupationsIds,
                streetAddress: action.streetAddress,
                experienceId: action.experienceId,
                insurance: action.insurance,
                propertyTypesIds: action.propertyTypesIds,
                profilePicture: action.profilePicture,
                phoneNumber: action.phoneNumber,
            };
        default:
            return state;
    }
};

export default uiReducer;
