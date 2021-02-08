import { FETCH_CUSTOMERS, RESET_CUSTOMERS } from '../actions/customers';

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
        case RESET_CUSTOMERS:
            return initialState;
        default:
            return state;
    }
};

export default customersReducer;
