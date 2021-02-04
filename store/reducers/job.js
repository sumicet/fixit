import {
    ADD_JOB,
    UPDATE_JOB,
    DELETE_JOB,
    SET_MY_JOBS,
    FETCH_ALL_JOBS,
    MARK_AS_COMPLETED,
    ADD_QUOTE,
    EDIT_QUOTE,
    DELETE_QUOTE,
    ADD_REQUEST,
    SET_REQUESTS,
    RESET_FILTERS_FOR_TRADESPERSON,
    SET_FILTERS_FOR_TRADESPERSON,
} from '../actions/job';

import Job from '../../models/Jobs/Job';
import Quote from '../../models/Jobs/Quote';
import Request from '../../models/Jobs/Request';

const initialState = {
    unfiltered: [],
    allJobs: [], // all pending jobs from all customers :)
    userPendingJobs: [], // customer: looking for TP, TP: offered a quote, waiting for customer approval
    userCompletedJobs: [],
    quotes: [], // quotes sent by tp OR quotes received by customers
    requests: [],
    filters: {
        occupationId: null,
        distance: 2,
    },
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
                // unfiltered: [...state.unfiltered].filter(job => job.id !== action.id),
                // allJobs: [...state.allJobs].filter(job => job.id !== action.id),
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
                quotes: action.quotes,
            };
        case FETCH_ALL_JOBS:
            return {
                ...state,
                unfiltered: action.allJobs,
                allJobs: action.allJobs.filter(job => job.distance <= 30000),
                quotes: action.quotes,
            };
        case MARK_AS_COMPLETED:
            const newUserPendingJobs = [...state.userPendingJobs].filter(
                job => job.id !== action.id
            );
            // const updatedAllJobs = [...state.allJobs].filter(
            //     job => job.id !== action.id
            // );
            const completedJob = state.userPendingJobs.find(
                job => job.id === action.id
            );
            const updatedUserCompletedJobs = [...state.userCompletedJobs];
            updatedUserCompletedJobs.push(completedJob);
            return {
                ...state,
                //allJobs: updatedAllJobs,
                userPendingJobs: newUserPendingJobs,
                userCompletedJobs: updatedUserCompletedJobs,
            };
        case ADD_QUOTE:
            const updatedQuotes = [...state.quotes];

            updatedQuotes.push(
                new Quote(
                    action.jobId,
                    action.tradespersonId,
                    action.price,
                    action.message,
                    action.date
                )
            );

            return {
                ...state,
                quotes: updatedQuotes,
            };
        case DELETE_QUOTE:
            return {
                ...state,
                quotes: [...state.quotes].filter(
                    q => q.tradespersonId !== action.tradespersonId
                ),
            };
        case EDIT_QUOTE:
            const updatedQuotesEdit = [...state.quotes];

            const quoteIndex = updatedQuotesEdit.findIndex(
                quote => quote.jobId === action.jobId
            );

            updatedQuotesEdit[quoteIndex].price = action.price;
            updatedQuotesEdit[quoteIndex].message = action.message;

            return {
                ...state,
                quotes: updatedQuotesEdit,
            };
        case ADD_REQUEST:
            const updatedRequests = [...state.requests];
            updatedRequests.push(
                new Request(
                    action.jobId,
                    action.userId,
                    action.tradespersonId,
                    action.date
                )
            );

            return {
                ...state,
                requests: updatedRequests,
            };
        case SET_REQUESTS:
            return {
                ...state,
                requests: action.requests,
            };
        case RESET_FILTERS_FOR_TRADESPERSON:
            return {
                ...state,
                allJobs: [...state.unfiltered].filter(job => job.distance < 30000),
                filters: {
                    occupationId: null,
                    distance: 2,
                },
            };
        case SET_FILTERS_FOR_TRADESPERSON:
            var tradespersonFilteredAll = [...state.unfiltered];

            if (action.occupationId) {
                tradespersonFilteredAll = tradespersonFilteredAll.filter(job =>
                    job.occupationId === action.occupationId
                );
            }

            switch (action.distance) {
                case 0:
                    tradespersonFilteredAll = tradespersonFilteredAll.filter(
                        tp => tp.distance < 10000
                    );
                    break;
                case 1:
                    tradespersonFilteredAll = tradespersonFilteredAll.filter(
                        tp => tp.distance < 20000
                    );
                    break;
                case 3:
                    tradespersonFilteredAll = [...state.unfiltered];
                    break;
                default:
                    tradespersonFilteredAll = tradespersonFilteredAll.filter(
                        tp => tp.distance < 30000
                    );
                    break;
            }

            return {
                ...state,
                allJobs: tradespersonFilteredAll,
                filters: {
                    occupationId: action.occupationId,
                    distance: action.distance,
                },
            };
        default:
            return state;
    }
};

export default jobReducer;
