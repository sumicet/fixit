import { FETCH_CUSTOMERS } from '../actions/customers';

const initialState = {
    all: []
};

const customersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CUSTOMERS:
            return {
                ...state,
                all: action.customers
            }
        default:
            return state;
    }
};

export default customersReducer;
