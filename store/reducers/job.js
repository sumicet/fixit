import {
    ADD_JOB,
    UPDATE_JOB,
    DELETE_JOB,
    SET_MY_JOBS,
    FETCH_ALL_JOBS,
    MARK_AS_COMPLETED,
} from '../actions/job';

import Job from '../../models/Jobs/Job';

const initialState = {
    allJobs: [], // all pending jobs from all customers :)
    userPendingJobs: [], // customer: looking for TP, TP: offered a quote, waiting for customer approval
    userCompletedJobs: [],
};

const editElement = (array, id, elem) => {
    const arrayCopy = array;
    const index = arrayCopy.findIndex(elem => elem.id === id);
    if (index) {
        arrayCopy[index] = elem;
    }
    return arrayCopy;
};

const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_JOB:
            const newJob = new Job(
                action.id,
                action.userId,
                action.date,
                action.occupationId,
                action.workTypeId,
                action.jobDescription,
                action.customerType,
                action.propertyType,
                action.jobAddress,
                action.startTimeId,
                action.images
            );

            return {
                ...state,
                allPendingJobs: [...state.allPendingJobs].concat(newJob),
                userPendingJobs: [...state.userPendingJobs].concat(newJob), // TODO this only works for customers
            };
        case UPDATE_JOB:
            const updatedJob = new Job(
                action.id,
                action.userId,
                action.date,
                action.occupationId,
                action.workTypeId,
                action.jobDescription,
                action.customerType,
                action.propertyType,
                action.jobAddress,
                action.startTimeId,
                action.images
            );

            const updatedAllPendingJobs = editElement(
                [...state.allPendingJobs],
                action.id,
                updatedJob
            );
            const updatedUserPendingJobs = editElement(
                [...state.userPendingJobs],
                action.id,
                updatedJob
            );

            return {
                ...state,
                allPendingJobs: updatedAllPendingJobs,
                userPendingJobs: updatedUserPendingJobs, // TODO this only works for customers
            };
        case DELETE_JOB:
            return {
                ...state,
                allJobs: [...state.allJobs].filter(job => job.id !== action.id),
                userPendingJobs: [...state.userPendingJobs].filter(
                    job => job.id !== action.id
                ),
                userCompletedJobs: [...state.userCompletedJobs].filter(
                    job => job.id !== action.id
                ),
            };
        case SET_MY_JOBS:
            return {
                ...state,
                userPendingJobs: action.userPendingJobs,
                userCompletedJobs: action.userCompletedJobs,
            };
        case FETCH_ALL_JOBS:
            return {
                ...state,
                allJobs: action.allJobs,
            };
        case MARK_AS_COMPLETED:
            const newUserPendingJobs = [...state.userPendingJobs].filter(
                job => job.id !== action.id
            );
            const updatedAllJobs = [...state.allJobs].filter(
                job => job.id !== action.id
            );
            const completedJob = state.userPendingJobs.find(
                job => job.id === action.id
            );
            const updatedUserCompletedJobs = [...state.userCompletedJobs];
            updatedUserCompletedJobs.push(completedJob);
            return {
                ...state,
                allJobs: updatedAllJobs,
                userPendingJobs: newUserPendingJobs,
                userCompletedJobs: updatedUserCompletedJobs,
            };
        default:
            return state;
    }
};

export default jobReducer;
