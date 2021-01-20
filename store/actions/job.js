export const ADD_JOB = 'ADD_JOB';
export const SET_MY_JOBS = 'SET_MY_JOBS';
export const UPDATE_JOB = 'UPDATE_JOB';
export const DELETE_JOB = 'DELETE_JOB';
export const FETCH_ALL_JOBS = 'FETCH_ALL_JOBS';
export const MARK_AS_COMPLETED = 'MARK_AS_COMPLETED';
export const ADD_QUOTE = 'ADD_QUOTE';

import Job from '../../models/Jobs/Job';
import * as Firebase from '../../config/Firebase';
import { addQuotedJob } from './tradesperson';

export const fetchQuotes = () => {
    return async dispatch => {
        try {
            var response = await fetch(
                'https://fixit-46444.firebaseio.com/allPendingJobs.json'
            );

            var responseData = await response.json();

            const allJobs = [];

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
                        break;
                    }
                }

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
                        images
                    )
                );
            }

            dispatch({
                type: FETCH_ALL_JOBS,
                allJobs,
            });
        } catch (error) {
            console.log('err');
        }
    };
};

export const addQuote = (jobId, tradespersonId, price, message) => {
    return async dispatch => {
        const date = new Date().toString();
        const ref = await Firebase.database
            .ref(`allPendingJobs/${jobId}`)
            .child('quotes');

        const quotes = ref.push();

        quotes.child('jobId').set(jobId);
        quotes.child('tradespersonId').set(tradespersonId);
        quotes.child('price').set(price);
        quotes.child('message').set(message);
        quotes.child('date').set(date);

        quotes.once('value').then(snap => {
            dispatch({
                type: ADD_QUOTE,
                id: snap.val(),
                jobId,
                tradespersonId,
                price,
                message,
                date,
            });
        });

        await dispatch(addQuotedJob(jobId, tradespersonId));
    };
};

export const markAsCompleted = id => {
    return async dispatch => {
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

        dispatch({
            type: MARK_AS_COMPLETED,
            id,
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

        images.forEach((image, index) => {
            fetch(image)
                .then(res => res.blob())
                .then(blob => {
                    Firebase.storage
                        .ref(
                            `/jobImages/${userId}/${responseData.name}/${index}`
                        )
                        .put(blob);
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
            images,
        });
    };
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
                }),
            }
        );

        const responsePatchData = await responsePatch.json();

        Firebase.storage
            .ref(
                `/jobImages/${responseGetData.userId}/${responsePatchData.name}`
            )
            .delete();

        images.forEach((image, index) => {
            fetch(image)
                .then(res => res.blob())
                .then(blob => {
                    Firebase.storage
                        .ref(
                            `/jobImages/${responseGetData.userId}/${responsePatchData.name}/${index}`
                        )
                        .put(blob);
                });
        });

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

        dispatch(resetJobData());
    };
};

export const deleteJob = id => {
    return async dispatch => {
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

        dispatch({
            type: DELETE_JOB,
            id,
        });
    };
};

export const fetchMyJobs = userId => {
    return async dispatch => {
        console.log(userId, 'in fetch my jobs');
        try {
            const response = await fetch(
                'https://fixit-46444.firebaseio.com/allPendingJobs.json'
            );

            const responseData = await response.json();

            const userPendingJobs = [];

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
                            images
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
                            images2
                        )
                    );
                }
            }

            dispatch({
                type: SET_MY_JOBS,
                userPendingJobs,
                userCompletedJobs,
            });
        } catch (error) {
            console.log('err');
        }
    };
};

export const fetchAllJobs = () => {
    return async dispatch => {
        try {
            var response = await fetch(
                'https://fixit-46444.firebaseio.com/allPendingJobs.json'
            );

            var responseData = await response.json();

            const allJobs = [];

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
                        break;
                    }
                }

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
                        images
                    )
                );
            }

            dispatch({
                type: FETCH_ALL_JOBS,
                allJobs,
            });
        } catch (error) {
            console.log('err');
        }
    };
};
