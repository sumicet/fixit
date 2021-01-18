export const ADD_JOB = 'ADD_JOB';
export const SET_MY_JOBS = 'SET_MY_JOBS';
export const UPDATE_JOB = 'UPDATE_JOB';
export const DELETE_JOB = 'DELETE_JOB';

import Job from '../../models/Jobs/Job';
import * as Firebase from '../../config/Firebase';

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
            .ref(`/jobImages/${userId}/${responsePatchData.name}`)
            .delete();

        images.forEach((image, index) => {
            fetch(image)
                .then(res => res.blob())
                .then(blob => {
                    Firebase.storage
                        .ref(
                            `/jobImages/${userId}/${responsePatchData.name}/${index}`
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
        const response = await fetch(
            `https://fixit-46444.firebaseio.com/allPendingJobs/${id}.json`,
            {
                method: 'DELETE',
            }
        );

        const responseData = await response.json();

        dispatch({
            type: DELETE_JOB,
            id,
        });
    };
};

export const fetchMyJobs = userId => {
    return async dispatch => {
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

            dispatch({
                type: SET_MY_JOBS,
                userPendingJobs,
            });
        } catch (error) {
            console.log('err');
        }
    };
};
