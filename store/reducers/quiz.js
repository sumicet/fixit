import { WORK_TYPES } from '../../data/Jobs/WorkTypes';

import {
    SET_ID,
    SET_OCCUPATION,
    SET_WORK_TYPE,
    SET_JOB_DESCRIPTION,
    SET_START_TIME,
    SET_JOB_ADDRESS,
    SET_CUSTOMER_TYPE,
    SET_PROPERTY_TYPE,
    RESET_JOB_DATA
} from '../actions/quiz';

const initialState = {
    id: null,
    occupationId: null,
    workTypes: [],
    workTypeId: null,
    startTimeId: null,
    jobDescription: null,
    jobAddress: {
        line1: null,
        line2: null,
        place_id: null,
    },
    customerType: null,
    propertyType: null,
};

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_JOB_DATA:
            return initialState;
        case SET_ID:
            return{
                ...state,
                id: action.id
            }
        case SET_OCCUPATION:
            const updatedWorkTypes = WORK_TYPES.filter(
                elem => elem.occupationId === action.occupationId
            );
            return {
                ...state,
                occupationId: action.occupationId,
                workTypes: updatedWorkTypes,
                workTypeId: null,
            };
        case SET_WORK_TYPE:
            return {
                ...state,
                workTypeId: action.workTypeId,
            };
        case SET_JOB_DESCRIPTION:
            return {
                ...state,
                jobDescription: action.jobDescription,
            };
        case SET_START_TIME:
            return {
                ...state,
                startTimeId: action.startTimeId,
            };
        case SET_JOB_ADDRESS:
            return {
                ...state,
                jobAddress: action.jobAddress,
            };
        case SET_CUSTOMER_TYPE:
            return {
                ...state,
                customerType: action.customerType,
            };
        case SET_PROPERTY_TYPE:
            return {
                ...state,
                propertyType: action.propertyType,
            };
        default:
            return state;
    }
};

export default quizReducer;
