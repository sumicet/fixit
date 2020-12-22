export const ADD_JOB = 'ADD_JOB';
export const SET_MY_JOBS = 'SET_MY_JOBS';
export const UPDATE_JOB = 'UPDATE_JOB';
export const DELETE_JOB = 'DELETE_JOB';
export const SET_TRADESPERSON_INFO = 'SET_TRADESPERSON_INFO';

import Job from '../../models/Jobs/Job';
import * as Firebase from '../../config/Firebase';

export const fetchTradespersonInfo = userId => {
    return async dispatch => {
        const response = await fetch(
            `https://fixit-46444.firebaseio.com/tradesperson/${userId}.json`
        );

        const responseData = await response.json();

        var profilePicture;

        try {
            const imageRef = Firebase.storage
                .ref()
                .child('/profilePictures/' + userId);
            profilePicture = await imageRef.getDownloadURL();
        } catch (error) {
            profilePicture = null;
        }

        dispatch({
            type: SET_TRADESPERSON_INFO,
            name: responseData.name,
            occupationsIds: responseData.occupationsIds,
            streetAddress: responseData.streetAddress,
            experienceId: responseData.experienceId,
            insurance: responseData.insurance,
            propertyTypesIds: responseData.propertyTypesIds,
            //profilePicture: null,
            profilePicture: profilePicture,
            phoneNumber: responseData.phoneNumber,
            recommendedByIds: responseData.recommendedByIds,
            rating: responseData.rating,
            ratingVotesAmount: responseData.ratingVotesAmount,
            contactsIds: responseData.contactsIds,
            email: responseData.email
        });
    };
};

export const setTradespersonInfo = (
    name,
    occupationsIds,
    streetAddress,
    experienceId,
    insurance,
    propertyTypesIds,
    profilePicture,
    phoneNumber
) => {
    return async (dispatch, getState) => {
        try {
            const userId = Firebase.auth.currentUser.uid;

            const ref = await Firebase.database
                .ref('tradesperson')
                .child(userId);

            ref.child('name').set(name);
            ref.child('occupationsIds').set(occupationsIds);
            ref.child('streetAddress').set(streetAddress);
            ref.child('experienceId').set(experienceId);
            ref.child('insurance').set(insurance);
            ref.child('propertyTypesIds').set(propertyTypesIds);
            ref.child('phoneNumber').set(phoneNumber);

            if (profilePicture) {
                fetch(profilePicture)
                    .then(res => res.blob())
                    .then(blob => {
                        Firebase.storage
                            .ref('/profilePictures/' + userId)
                            .put(blob);
                    });
            }
        } catch (error) {
            console.log(error);
        }

        dispatch({
            type: SET_TRADESPERSON_INFO,
            name,
            occupationsIds,
            streetAddress,
            experienceId,
            insurance,
            propertyTypesIds,
            profilePicture,
            phoneNumber,
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
    startTimeId
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

export const fetchMyJobs = () => {
    return async dispatch => {
        try {
            const response = await fetch(
                'https://fixit-46444.firebaseio.com/allPendingJobs.json'
            );

            const responseData = await response.json();

            const userPendingJobs = [];

            for (const key in responseData) {
                if (responseData[key].userId === 'u1') {
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
                            responseData[key].startTimeId
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
