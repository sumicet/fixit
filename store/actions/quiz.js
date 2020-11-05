export const SET_OCCUPATION = 'SET_OCCUPATION';
export const SET_WORK_TYPE = 'SET_WORK_TYPE';
export const SET_JOB_DESCRIPTION = 'SET_JOB_DESCRIPTION';
export const SET_SELECTED_START_TIME = 'SET_SELECTED_START_TIME';
export const SET_JOB_ADDRESS = 'SET_JOB_ADDRESS';
export const SET_CUSTOMER_TYPE = 'SET_PROPERTY_TYPE';
export const SET_PROPERTY_TYPE = 'SET_PROPERTY_TYPE';

export const setOccupation = occupationId => {
    console.log(occupationId);
    return {
        type: SET_OCCUPATION,
        occupationId
    }
};

export const setWorkType = selectedWorkTypeId => {
    return {
        type: SET_WORK_TYPE,
        selectedWorkTypeId
    }
}

export const setJobDescription = jobDescription => {
    return {
        type: SET_JOB_DESCRIPTION,
        jobDescription
    }
}

export const setSelectedStartTime = selectedStartTimeId => {
    return {
        type: SET_SELECTED_START_TIME,
        selectedStartTimeId
    }
}

export const setJobAddress = jobAddress => {
    return {
        type: SET_JOB_ADDRESS,
        jobAddress
    }
}

export const setCustomerType = customerType => {
    return {
        type: SET_CUSTOMER_TYPE,
        customerType
    }
}

export const setPropertyType = propertyType => {
    return {
        type: SET_PROPERTY_TYPE,
        propertyType
    }
}
