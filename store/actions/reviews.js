export const ADD_REVIEW = 'ADD_REVIEW';
export const FETCH_REVIEWS = 'FETCH_REVIEWS';

import * as Firebase from '../../config/Firebase';

export const addReview = (userId, tradespersonId, rating, comment) => {
    return async dispatch => {
        const ref = await Firebase.database
            .ref('reviews')
            .child(tradespersonId);
        ref.child(userId).child('rating').set(rating);
        const date = (new Date()).toString();
        ref.child(userId).child('date').set(date);
        ref.child(userId).child('comment').set(comment);
        console.log('i done', userId, tradespersonId, rating, comment, date)
        dispatch({
            type: ADD_REVIEW,
            userId,
            tradespersonId,
            rating,
            comment,
            date
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
                    date: responseData[key][key2].date,
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
