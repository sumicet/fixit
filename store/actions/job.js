export const ADD_JOB = 'ADD_JOB';
export const SET_MY_JOBS = 'SET_MY_JOBS';
export const UPDATE_JOB = 'UPDATE_JOB';
export const DELETE_JOB = 'DELETE_JOB';
export const FETCH_ALL_JOBS = 'FETCH_ALL_JOBS';
export const MARK_AS_COMPLETED = 'MARK_AS_COMPLETED';
export const ADD_QUOTE = 'ADD_QUOTE';
export const EDIT_QUOTE = 'EDIT_QUOTE';
export const DELETE_QUOTE = 'DELETE_QUOTE';
export const ADD_REQUEST = 'ADD_REQUEST';
export const SET_REQUESTS = 'SET_REQUESTS';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const SET_FILTERS_FOR_TRADESPERSON = 'SET_FILTERS_FOR_TRADESPERSON';
export const RESET_FILTERS_FOR_TRADESPERSON = 'RESET_FILTERS_FOR_TRADESPERSON';
export const SEARCH_ALL_JOBS = 'SEARCH_ALL_JOBS';
export const RESET_JOBS = 'RESET_JOBS';

import Job from '../../models/Jobs/Job';
import * as Firebase from '../../config/Firebase';
import Request from '../../models/Jobs/Request';
import { getDistance } from '../../actions/distance';
import Quote from '../../models/Jobs/Quote';

export const setRequests = requests => {
    return async dispatch => {
        dispatch({
            type: SET_REQUESTS,
            requests,
        });
    };
};

export const sendRequest = (jobId, userId, tradespersonId) => {
    return async dispatch => {
        const date = new Date().toString();
        const ref = await Firebase.database
            .ref(`tradesperson/${tradespersonId}`)
            .child('requests');

        const snap = await ref.once('value');

        const requests = snap.val() ? snap.val() : [];

        requests.push(new Request(jobId, userId, tradespersonId, date));
        ref.set(requests);

        dispatch({
            type: ADD_REQUEST,
            jobId,
            userId,
            tradespersonId,
            date,
        });
    };
};

export const deleteQuote = (jobId, tradespersonId) => {
    return async dispatch => {
        const ref = await Firebase.database
            .ref(`allPendingJobs/${jobId}`)
            .child('quotes');

        const snap = await ref.once('value');

        const quotes = snap.val() ? snap.val() : [];

        const updatedQuotes = quotes.filter(
            quote => quote.tradespersonId !== tradespersonId
        );

        ref.set(updatedQuotes);

        dispatch({
            type: DELETE_QUOTE,
            jobId,
            tradespersonId,
        });
    };
};

export const addQuote = (jobId, tradespersonId, price, message) => {
    return async dispatch => {
        const date = new Date().toString();
        const ref = await Firebase.database
            .ref(`allPendingJobs/${jobId}`)
            .child('quotes');

        const snap = await ref.once('value');

        const quotes = snap.val() ? snap.val() : [];

        const index = quotes.findIndex(
            quote => quote.tradespersonId === tradespersonId
        );

        if (index >= 0) {
            quotes[index].price = price;
            quotes[index].message = message;
            ref.set(quotes);

            dispatch({
                type: EDIT_QUOTE,
                jobId,
                tradespersonId,
                price,
                message,
            });
        } else {
            quotes.push(new Quote(jobId, tradespersonId, price, message, date));
            ref.set(quotes);

            dispatch({
                type: ADD_QUOTE,
                jobId,
                tradespersonId,
                price,
                message,
                date,
            });

            // Delete all requests for this job when sending a quote

            const snap = await Firebase.database
                .ref(`tradesperson/${tradespersonId}/requests`)
                .once('value');

            const requests = snap.val().filter(req => req.jobId !== jobId);

            await Firebase.database
                .ref(`tradesperson/${tradespersonId}/requests`)
                .set(requests);

            dispatch(setRequests(requests));
        }
    };
};

export const markAsCompleted = id => {
    return async (dispatch, getState) => {
        const response = await fetch(
            `https://fixit-46444.firebaseio.com/allPendingJobs/${id}.json`
        );

        const responseData = await response.json();

        await fetch(
            `https://fixit-46444.firebaseio.com/allPendingJobs/${id}.json`,
            {
                method: 'DELETE',
            }
        );

        await fetch(
            `https://fixit-46444.firebaseio.com/allCompletedJobs/${id}.json`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: responseData.userId,
                    date: responseData.date,
                    occupationId: responseData.occupationId,
                    workTypeId: responseData.workTypeId,
                    jobDescription: responseData.jobDescription,
                    customerType: responseData.customerType,
                    propertyType: responseData.propertyType,
                    jobAddress: responseData.jobAddress,
                    startTimeId: responseData.startTimeId,
                }),
            }
        );

        const requests = getState().job.requests.filter(
            req => req.jobId !== id
        );
        const requestsToBeDeleted = await getState().job.requests.filter(
            req => req.jobId === id
        );
        const quotes = getState().job.quotes.filter(
            quote => quote.jobId !== id
        );

        requestsToBeDeleted.forEach(async delReq => {
            await Firebase.database
                .ref(`tradesperson/${delReq.tradespersonId}`)
                .child('requests')
                .once('value')
                .then(snap => {
                    const requests = snap.val();
                    const updatedRequests = [];
                    requests.forEach(
                        req =>
                            req.jobId !== delReq.jobId &&
                            updatedRequests.push(req)
                    );
                    if (updatedRequests.length > 0) {
                        Firebase.database
                            .ref(`tradesperson/${delReq.tradespersonId}`)
                            .child('requests')
                            .set(updatedRequests);
                    } else {
                        Firebase.database
                            .ref(`tradesperson/${delReq.tradespersonId}`)
                            .child('requests')
                            .remove();
                    }
                });
        });

        dispatch({
            type: MARK_AS_COMPLETED,
            id,
            requests,
            quotes,
        });
    };
};

export const addJob = (
    userId,
    occupationId,
    workTypeId,
    jobDescription,
    customerType,
    propertyType,
    jobAddress,
    startTimeId,
    images
) => {
    return async dispatch => {
        const date = new Date().toString();
        const response = await fetch(
            `https://fixit-46444.firebaseio.com/allPendingJobs.json`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    date,
                    occupationId,
                    workTypeId,
                    jobDescription,
                    customerType,
                    propertyType,
                    jobAddress,
                    startTimeId,
                }),
            }
        );

        const responseData = await response.json();

        const blobs = [];

        images.forEach((image, index) => {
            fetch(image)
                .then(res => res.blob())
                .then(blob => {
                    console.log(blob);
                    Firebase.storage
                        .ref(
                            `/jobImages/${userId}/${responseData.name}/${index}`
                        )
                        .put(blob)
                        .then(async () => {
                            const imageRef = Firebase.storage
                                .ref()
                                .child(
                                    `/jobImages/${userId}/${responseData.name}/${index}`
                                );
                            const image = await imageRef.getDownloadURL();
                            blobs.push(image);
                        });
                });
        });

        dispatch({
            type: ADD_JOB,
            id: responseData.name,
            userId,
            date,
            occupationId,
            workTypeId,
            jobDescription,
            customerType,
            propertyType,
            jobAddress,
            startTimeId,
            images: blobs,
        });
    };
};

const imageExists = image_url => {
    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;
};

export const editJob = (
    id,
    occupationId,
    workTypeId,
    jobDescription,
    customerType,
    propertyType,
    jobAddress,
    startTimeId,
    images
) => {
    return async dispatch => {
        try {
            const responseGet = await fetch(
                `https://fixit-46444.firebaseio.com/allPendingJobs/${id}.json`
            );

            const responseGetData = await responseGet.json();

            const responsePatch = await fetch(
                `https://fixit-46444.firebaseio.com/allPendingJobs/${id}.json`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: responseGetData.userId,
                        date: responseGetData.date,
                        occupationId,
                        workTypeId,
                        jobDescription,
                        customerType,
                        propertyType,
                        jobAddress,
                        startTimeId,
                        quotes: responseGetData.quotes,
                        requests: responseGetData.requests,
                    }),
                }
            );

            const responsePatchData = await responsePatch.json();

            // TODO can't edit images
            // when adding an image you store it as a blob
            // fetch it as a blob
            // then when u edit you try to do this..

            // const blobs = [];

            // await images.forEach(async (image, index) => {
            //     fetch(image)
            //         .then(res => res.blob())
            //         .then(blob => {
            //             // Firebase.storage
            //             //     .ref(
            //             //         `/jobImages/${responseGetData.userId}/${id}/${index}`
            //             //     )
            //             //     .put(blob);
            //             blobs.push(blob);
            //         })
            //         .catch(error => {
            //             console.log('err while editing job - image', error);
            //         });
            // });

            // try {
            //     const imgRef = await Firebase.storage.ref(
            //         `/jobImages/${responseGetData.userId}/${id}`
            //     );
            //     imgRef.delete();
            // } catch (error) {
            //     console.log('No images found at this ref', error);
            // }

            // blobs.forEach((blob, index) => {
            //     Firebase.storage
            //         .ref(`/jobImages/${responseGetData.userId}/${id}/${index}`)
            //         .put(blob);
            // });

            dispatch({
                type: UPDATE_JOB,
                id,
                userId: responseGetData.userId,
                date: responseGetData.date,
                occupationId,
                workTypeId,
                jobDescription,
                customerType,
                propertyType,
                jobAddress,
                startTimeId,
                images,
            });
        } catch (error) {
            console.log('error while editing a job', error);
        }

        //TODO there was a dispatch(resetJobData()) here idk
    };
};

export const deleteJob = id => {
    return async (dispatch, getState) => {
        await fetch(
            `https://fixit-46444.firebaseio.com/allPendingJobs/${id}.json`,
            {
                method: 'DELETE',
            }
        );

        await fetch(
            `https://fixit-46444.firebaseio.com/allCompletedJobs/${id}.json`,
            {
                method: 'DELETE',
            }
        );

        const requests = getState().job.requests.filter(
            req => req.jobId !== id
        );
        const requestsToBeDeleted = await getState().job.requests.filter(
            req => req.jobId === id
        );
        const quotes = getState().job.quotes.filter(
            quote => quote.jobId !== id
        );

        requestsToBeDeleted.forEach(async delReq => {
            await Firebase.database
                .ref(`tradesperson/${delReq.tradespersonId}`)
                .child('requests')
                .once('value')
                .then(snap => {
                    const requests = snap.val();
                    const updatedRequests = [];
                    requests.forEach(
                        req =>
                            req.jobId !== delReq.jobId &&
                            updatedRequests.push(req)
                    );
                    if (updatedRequests.length > 0) {
                        Firebase.database
                            .ref(`tradesperson/${delReq.tradespersonId}`)
                            .child('requests')
                            .set(updatedRequests);
                    } else {
                        Firebase.database
                            .ref(`tradesperson/${delReq.tradespersonId}`)
                            .child('requests')
                            .remove();
                    }
                });
        });

        dispatch({
            type: DELETE_JOB,
            id,
            requests,
            quotes,
        });
    };
};

export const fetchMyJobs = (userId, userType) => {
    return async dispatch => {
        console.log(userId, 'in fetch my jobs');
        try {
            const response = await fetch(
                'https://fixit-46444.firebaseio.com/allPendingJobs.json'
            );

            const responseData = await response.json();

            const userPendingJobs = [];
            const userQuotes = [];

            for (const key in responseData) {
                if (responseData[key].userId === userId) {
                    const images = [];
                    var i;
                    for (i = 0; i < 10; i++) {
                        try {
                            const imageRef = Firebase.storage
                                .ref()
                                .child(`/jobImages/${userId}/${key}/${i}`);
                            const image = await imageRef.getDownloadURL();
                            images.push(image);
                        } catch (error) {
                            break;
                        }
                    }

                    const quotes = responseData[key].quotes;

                    if (quotes) {
                        quotes.forEach(quote => {
                            if (
                                (userType === 'tradesperson' &&
                                    quote.tradespersonId === userId) ||
                                (userType === 'customer' &&
                                    responseData[key].userId === userId)
                            ) {
                                userQuotes.push(quote);
                            }
                        });
                    }

                    userPendingJobs.push(
                        new Job(
                            key,
                            responseData[key].userId,
                            responseData[key].date,
                            responseData[key].occupationId,
                            responseData[key].workTypeId,
                            responseData[key].jobDescription,
                            responseData[key].customerType,
                            responseData[key].propertyType,
                            responseData[key].jobAddress,
                            responseData[key].startTimeId,
                            images,
                            responseData[key].quotes
                        )
                    );
                }
            }

            const response2 = await fetch(
                'https://fixit-46444.firebaseio.com/allCompletedJobs.json'
            );

            const responseData2 = await response2.json();

            const userCompletedJobs = [];

            for (const key2 in responseData2) {
                if (responseData2[key2].userId === userId) {
                    const images2 = [];
                    var i;
                    for (i = 0; i < 10; i++) {
                        try {
                            const imageRef2 = Firebase.storage
                                .ref()
                                .child(`/jobImages/${userId}/${key2}/${i}`);
                            const image2 = await imageRef2.getDownloadURL();
                            images2.push(image2);
                        } catch (error) {
                            break;
                        }
                    }

                    // const quotes2 = responseData2[key2].quotes;

                    // if (quotes2) {
                    //     quotes2.forEach(quote => {
                    //         if (
                    //             userType === 'tradesperson' &&
                    //             quote.tradespersonId === userId // TODO add for customer
                    //         ) {
                    //             userQuotes.push(quote);
                    //         }
                    //     });
                    // }

                    userCompletedJobs.push(
                        new Job(
                            key2,
                            responseData2[key2].userId,
                            responseData2[key2].date,
                            responseData2[key2].occupationId,
                            responseData2[key2].workTypeId,
                            responseData2[key2].jobDescription,
                            responseData2[key2].customerType,
                            responseData2[key2].propertyType,
                            responseData2[key2].jobAddress,
                            responseData2[key2].startTimeId,
                            images2,
                            null
                        )
                    );
                }
            }

            dispatch({
                type: SET_MY_JOBS,
                userPendingJobs,
                userCompletedJobs,
                quotes: userQuotes,
            });
        } catch (error) {
            console.log('err');
        }
    };
};

export const fetchAllJobs = (userId, userType, user_place_id) => {
    return async dispatch => {
        try {
            var response = await fetch(
                'https://fixit-46444.firebaseio.com/allPendingJobs.json'
            );

            var responseData = await response.json();

            const allJobs = [];
            const userQuotes = [];

            for (const key in responseData) {
                const images = [];
                var i;
                for (i = 0; i < 10; i++) {
                    try {
                        const imageRef = Firebase.storage
                            .ref()
                            .child(
                                `/jobImages/${responseData[key].userId}/${key}/${i}`
                            );
                        const image = await imageRef.getDownloadURL();
                        images.push(image);
                    } catch (error) {
                        console.log('catchyyyyyyyyyyyy')
                        break;
                    }
                }

                const quotes = responseData[key].quotes;

                if (quotes) {
                    quotes.forEach(quote => {
                        if (
                            userType === 'tradesperson' &&
                            quote.tradespersonId === userId
                        ) {
                            userQuotes.push(quote);
                        }
                    });
                }

                getDistance(
                    user_place_id,
                    responseData[key].jobAddress.place_id
                ).then(({ meters }) => {
                    console.log(meters);
                    allJobs.push(
                        new Job(
                            key,
                            responseData[key].userId,
                            responseData[key].date,
                            responseData[key].occupationId,
                            responseData[key].workTypeId,
                            responseData[key].jobDescription,
                            responseData[key].customerType,
                            responseData[key].propertyType,
                            responseData[key].jobAddress,
                            responseData[key].startTimeId,
                            images,
                            null,
                            meters
                        )
                    );
                });
            }

            dispatch({
                type: FETCH_ALL_JOBS,
                allJobs,
                quotes: userQuotes,
            });
        } catch (error) {
            console.log('err while fetching all jobs', error);
        }
    };
};

export const setFiltersForTradesperson = (occupationId, distance) => {
    return async dispatch => {
        dispatch({
            type: SET_FILTERS_FOR_TRADESPERSON,
            occupationId,
            distance,
        });
    };
};

export const resetFiltersForTradesperson = () => {
    return async dispatch => {
        dispatch({
            type: RESET_FILTERS_FOR_TRADESPERSON,
        });
    };
};

export const searchAllJobs = input => {
    return async dispatch => {
        dispatch({
            type: SEARCH_ALL_JOBS,
            input,
        });
    };
};

export const resetJobs = () => {
    return async dispatch => {
        dispatch({
            type: RESET_JOBS,
        });
    };
};
