export const ADD_REVIEW = 'ADD_REVIEW';
export const FETCH_REVIEWS = 'FETCH_REVIEWS';

import * as Firebase from '../../config/Firebase';

export const addReview = (userId, tradespersonId, rating, comment) => {
    return async dispatch => {
        console.log(userId, tradespersonId, rating, comment);
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

        //const ref2 = Firebase.database.ref('tradesperson').child(tradespersonId);

        const ref2 = Firebase.database
            .ref('tradesperson')
            .child(tradespersonId);

        ref2.child('rating')
            .once('value')
            .then(snap => {
                const oldRating = snap.val();
                if (oldRating) {
                    ref2.child('ratingVotesAmount')
                        .once('value')
                        .then(snap2 => {
                            const oldRatingVotesAmount = snap2.val();
                            const newRating =
                                (oldRating * oldRatingVotesAmount + rating) /
                                (oldRatingVotesAmount + 1);
                            ref2.child('rating').set(newRating);
                            ref2.child('ratingVotesAmount').set(
                                oldRatingVotesAmount + 1
                            );
                            dispatch(
                                setRating(
                                    tradespersonId,
                                    newRating,
                                    oldRatingVotesAmount + 1
                                )
                            );
                        });
                } else {
                    ref2.child('rating').set(rating);
                    ref2.child('ratingVotesAmount').set(1);
                    dispatch(
                        setRating(
                            tradespersonId,
                            newRating,
                            oldRatingVotesAmount + 1
                        )
                    );
                }
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
