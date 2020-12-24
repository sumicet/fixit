export const ADD_REVIEW = 'ADD_REVIEW';
export const FETCH_REVIEWS = 'FETCH_REVIEWS';

import * as Firebase from '../../config/Firebase';

export const addReview = (userId, tradespersonId, rating, comment) => {
    return async dispatch => {
        const ref = await Firebase.database
            .ref('reviews')
            .child(tradespersonId);
        ref.child(userId).child('rating').set(rating);
        ref.child(userId).child('comment').set(comment);
        dispatch({
            type: ADD_REVIEW,
            userId,
            tradespersonId,
            rating,
            comment,
        });
    };
};

export const fetchReviews = () => {
    return async dispatch => {
        const response = await fetch(
            `https://fixit-46444.firebaseio.com/reviews.json`
        );

        const responseData = await response.json();
        const reviews = [];

        for (const key in responseData) {
            for (const key2 in responseData[key]) {
                reviews.push({
                    tradespersonId: key,
                    userId: key2,
                    rating: responseData[key][key2].rating,
                    comment: responseData[key][key2].comment,
                })
            }
        }

        console.log(reviews)

        dispatch({
            type: FETCH_REVIEWS,
            all: reviews,
        });
    };
};
