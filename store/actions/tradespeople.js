export const FETCH_TRADESPEOPLE = 'FETCH_TRADESPEOPLE';
export const SET_RATING = 'SET_RATING';
export const CHANGE_TRADESPERSON_NAME = 'CHANGE_TRADESPERSON_NAME';
export const SET_FILTERS_FOR_CUSTOMER = 'SET_FILTERS_FOR_CUSTOMER';
export const RESET_FILTERS_FOR_CUSTOMER = 'RESET_FILTERS_FOR_CUSTOMER';
export const SEARCH_ALL_TRADESPEOPLE = 'SEARCH_ALL_TRADESPEOPLE';
export const RESET_TRADESPEOPLE = 'RESET_TRADESPEOPLE';

import { getDistance } from '../../actions/distance';
import * as Firebase from '../../config/Firebase';
import Request from '../../models/Jobs/Request';
import { setRequests } from './job';

export const setRating = (userId, rating, ratingVotesAmount) => {
    return async dispatch => {
        dispatch({
            type: SET_RATING,
            userId,
            rating,
            ratingVotesAmount,
        });
    };
};

export const fetchAll = (currentUserId, user_place_id) => {
    return async dispatch => {
        const response = await fetch(
            `https://fixit-46444.firebaseio.com/tradesperson.json`
        );

        const responseData = await response.json();

        const profilePictureList = [];
        const tradespeopleData = [];
        const requests = [];

        for (const key in responseData) {
            const updatedData = responseData[key];
            const { meters } = await getDistance(
                user_place_id,
                responseData[key].streetAddress.place_id
            );
            updatedData.distance = meters;

            tradespeopleData.push(updatedData);
            responseData[key].requests?.forEach(req => {
                if (req.userId === currentUserId) {
                    requests.push(
                        new Request(
                            req.jobId,
                            req.userId,
                            req.tradespersonId,
                            req.date
                        )
                    );
                }
            });
        }

        try {
            const res = await Firebase.storage
                .ref()
                .child('/profilePictures/')
                .listAll();

            const items = res.items;
            var i;
            if (items)
                for (i = 0; i < items.length; i++) {
                    const profilePicture = await items[i].getDownloadURL();
                    profilePictureList.push({
                        userId: items[i].name,
                        profilePicture,
                    });
                }
        } catch (error) {
            console.log('no pics');
        }

        dispatch({
            type: FETCH_TRADESPEOPLE,
            tradespeopleData,
            profilePictureList,
        });

        dispatch(setRequests(requests));
    };
};

export const setFiltersForCustomer = (occupationId, distance, rating) => {
    return async dispatch => {
        dispatch({
            type: SET_FILTERS_FOR_CUSTOMER,
            occupationId,
            distance,
            rating,
        });
    };
};

export const resetFiltersForCustomer = () => {
    return async dispatch => {
        dispatch({
            type: RESET_FILTERS_FOR_CUSTOMER,
        });
    };
};

export const searchAllTradespeople = input => {
    return async dispatch => {
        dispatch({
            type: SEARCH_ALL_TRADESPEOPLE,
            input,
        });
    };
};

export const resetTradespeople = () => {
    return async dispatch => {
        dispatch({
            type: RESET_TRADESPEOPLE,
        });
    };
};