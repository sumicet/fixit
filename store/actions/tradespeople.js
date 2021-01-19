export const FETCH_TRADESPEOPLE = 'FETCH_TRADESPEOPLE';
export const SET_DISTANCES = 'SET_DISTANCES';
export const SET_RATING = 'SET_RATING';
export const CHANGE_TRADESPERSON_NAME = 'CHANGE_TRADESPERSON_NAME';

import * as Firebase from '../../config/Firebase';

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

export const fetchAll = () => {
    return async dispatch => {
        const response = await fetch(
            `https://fixit-46444.firebaseio.com/tradesperson.json`
        );

        const responseData = await response.json();

        const profilePictureList = [];
        const tradespeopleData = [];

        for (const key in responseData) {
            tradespeopleData.push(responseData[key]);
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
    };
};

export const setDistances = place_id => {
    return async (dispatch, getState) => {
        const all = getState().tradespeople.all;
        const updatedAllDistances = [];
        for (const key in all) {
            const { status, meters } = await getDistance(
                place_id,
                all[key].streetAddress.place_id
            );

            var distance;

            if (status === 'OK') {
                if (meters < 1000) {
                    distance = -1;
                } else {
                    if (meters >= 1000 && meters <= 50000) {
                        distance = Math.floor(meters / 1000).toString();
                    } else {
                        distance = -2;
                    }
                }
            } else {
                distance = 'N/A';
            }

            updatedAllDistances.push({
                ...all[key],
                distance,
            });
        }
        dispatch({
            type: SET_DISTANCES,
            all: updatedAllDistances,
        });
    };
};
