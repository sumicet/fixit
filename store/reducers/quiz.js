import { WORK_TYPES } from '../../data/Jobs/WorkTypes';

import {
    SET_OCCUPATION,
    SET_WORK_TYPE,
    SET_JOB_DESCRIPTION,
    SET_START_TIME,
    SET_JOB_ADDRESS,
    SET_CUSTOMER_TYPE,
    SET_PROPERTY_TYPE,
} from '../actions/quiz';

const initialState = {
    occupationId: null,
    workTypes: null,
    selectedWorkTypeId: null,
    startTimeId: null,
    jobDescription: null,
    jobAddress: {
        line1: null,
        line2: null,
    },
    customerType: null,
    propertyType: null,
};

const quizReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_OCCUPATION:
            const updatedWorkTypes = WORK_TYPES.filter(
                elem => elem.occupationId === action.occupationId
            );
            return {
                occupationId: action.occupationId,
                workTypes: updatedWorkTypes,
                selectedWorkTypeId: null,
                startTimeId: state.startTimeId,
                jobDescription: state.jobDescription,
                jobAddress: state.jobAddress,
                customerType: state.customerType,
                propertyType: state.propertyType,
            };
        case SET_WORK_TYPE:
            return {
                ...state,
                selectedWorkTypeId: action.selectedWorkTypeId,
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
