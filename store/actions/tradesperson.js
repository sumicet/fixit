export const ADD_JOB = 'ADD_JOB';
export const SET_MY_JOBS = 'SET_MY_JOBS';
export const UPDATE_JOB = 'UPDATE_JOB';
export const DELETE_JOB = 'DELETE_JOB';
export const SET_TRADESPERSON_INFO = 'SET_TRADESPERSON_INFO';
export const ADD_QUOTED_JOB = 'ADD_QUOTED_JOB';
export const FETCH_TRADESPERSON_INFO = 'FETCH_TRADESPERSON_INFO';
export const SET_TRADESPERSON_REQUESTS = 'SET_TRADESPERSON_REQUESTS';

import * as Firebase from '../../config/Firebase';

// export const addQuotedJob = (jobId, tradespersonId) => {
//     return async (dispatch, getState) => {
//         const snap = await Firebase.database
//             .ref(`tradesperson/${tradespersonId}`)
//             .child('jobsQuoted')
//             .once('value');

//         const oldJobsQuoted = snap.val();

//         if (oldJobsQuoted) {
//             oldJobsQuoted.push(jobId);
//             await Firebase.database
//                 .ref(`tradesperson/${tradespersonId}`)
//                 .child('jobsQuoted')
//                 .set(oldJobsQuoted);
//         } else {
//             await Firebase.database
//                 .ref(`tradesperson/${tradespersonId}`)
//                 .child('jobsQuoted')
//                 .set([jobId]);
//         }

//         dispatch({
//             type: ADD_QUOTED_JOB,
//             jobId,
//         });
//     };
// };

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
            type: FETCH_TRADESPERSON_INFO,
            occupationsIds: responseData.occupationsIds,
            streetAddress: responseData.streetAddress,
            experienceId: responseData.experienceId,
            insurance: responseData.insurance,
            propertyTypesIds: responseData.propertyTypesIds,
            profilePicture: profilePicture,
            phoneNumber: responseData.phoneNumber,
            recommendedByIds: responseData.recommendedByIds,
            rating: responseData.rating,
            ratingVotesAmount: responseData.ratingVotesAmount,
            contactsIds: responseData.contactsIds,
            email: responseData.email,
            requests: responseData.requests,
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
    return async dispatch => {
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