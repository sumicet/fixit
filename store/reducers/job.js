import { ADD_JOB, SET_MY_JOBS } from '../actions/job';

import Job from '../../models/Jobs/Job';

const initialState = {
    allPendingJobs: [], // all pending jobs from all customers :)
    userPendingJobs: [], // customer: looking for TP, TP: offered a quote, waiting for customer approval
    userInProgressJobs: [], // assign to customer
    userFinishedJobs: [], // assign to customer
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
        case SET_MY_JOBS:
            return {
                ...state,
                userPendingJobs: action.userPendingJobs
            }
        default:
            return state;
    }
};

export default jobReducer;
