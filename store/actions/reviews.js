export const ADD_REVIEW = 'ADD_REVIEW';
export const FETCH_REVIEWS = 'FETCH_REVIEWS';

import * as Firebase from '../../config/Firebase';
import { setRating } from './tradespeople';

export const addReview = (userId, tradespersonId, rating, comment) => {
    return async (dispatch, getState) => {
        const ref2 = Firebase.database
            .ref('tradesperson')
            .child(tradespersonId);

        const snap = await ref2.child('rating').once('value');
        const oldRating = snap.val();
        if (oldRating) {
            const snap2 = await ref2.child('ratingVotesAmount').once('value');
            const reviews = getState().reviews.all;
            const oldReview = reviews.find(
                review =>
                    review.tradespersonId === tradespersonId &&
                    review.userId === userId
            );
            console.log('old review', oldReview);
            var ratingVotesAmount, newRating;
            if (oldReview) {
                console.log('yeah, old');
                ratingVotesAmount = snap2.val();
                newRating =
                    (oldRating * ratingVotesAmount -
                        oldReview.rating +
                        rating) /
                    ratingVotesAmount;
            } else {
                console.log('no, old');
                ratingVotesAmount = snap2.val() + 1;
                newRating =
                    (oldRating * (ratingVotesAmount - 1) + rating) /
                    ratingVotesAmount;
            }

            console.log(
                'the new rating & count are',
                newRating,
                ratingVotesAmount
            );

            ref2.child('rating').set(newRating);
            ref2.child('ratingVotesAmount').set(ratingVotesAmount);
            dispatch(setRating(tradespersonId, newRating, ratingVotesAmount));
        } else {
            ref2.child('rating').set(rating);
            ref2.child('ratingVotesAmount').set(1);
            dispatch(setRating(tradespersonId, rating, 1));
        }

        const ref = Firebase.database.ref('reviews').child(tradespersonId);
        ref.child(userId).child('rating').set(rating);
        const date = new Date().toString();
        ref.child(userId).child('date').set(date);
        ref.child(userId).child('comment').set(comment);

        dispatch({
            type: ADD_REVIEW,
            userId,
            tradespersonId,
            rating,
            comment,
            date,
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
                });
            }
        }

        dispatch({
            type: FETCH_REVIEWS,
            all: reviews,
        });
    };
};
