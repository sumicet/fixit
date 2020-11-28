import { ADD_JOB, UPDATE_JOB, DELETE_JOB, SET_MY_JOBS } from '../actions/job';

import Job from '../../models/Jobs/Job';

const initialState = {
    allPendingJobs: [], // all pending jobs from all customers :)
    userPendingJobs: [], // customer: looking for TP, TP: offered a quote, waiting for customer approval
    userInProgressJobs: [], // assign to customer
    userFinishedJobs: [], // assign to customer
};

const editElement = (array, id, elem) => {
    const arrayCopy = array;
    const index = arrayCopy.findIndex(elem => elem.id === id);
    if (index) {
        arrayCopy[index] = elem;
    }
    return arrayCopy;
};

const removeElement = (array, id) => {
    const arrayCopy = array;
    const index = arrayCopy.findIndex(elem => elem.id === id);
    if (index) {
        arrayCopy.splice(index, 1);
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
                action.startTimeId
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
                action.startTimeId
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
            return state;
        case SET_MY_JOBS:
            return {
                ...state,
                userPendingJobs: action.userPendingJobs,
            };
        default:
            return state;
    }
};

export default jobReducer;
