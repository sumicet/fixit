export const FETCH_CUSTOMERS = 'FETCH_CUSTOMERS';

export const fetchCustomers = () => {
    return async dispatch => {
        const response = await fetch(
            `https://fixit-46444.firebaseio.com/customer.json`
        );

        const responseData = await response.json();

        const customers = [];

        for (const key in responseData) {
            customers.push({
                userId: responseData[key].userId,
                name: responseData[key].name,
            });
        }

        dispatch({
            type: FETCH_CUSTOMERS,
            customers
        });
    };
};
