export const SET_ID = 'SET_ID';
export const SET_OCCUPATION = 'SET_OCCUPATION';
export const SET_WORK_TYPE = 'SET_WORK_TYPE';
export const SET_JOB_DESCRIPTION = 'SET_JOB_DESCRIPTION';
export const SET_START_TIME = 'SET_START_TIME';
export const SET_JOB_ADDRESS = 'SET_JOB_ADDRESS';
export const SET_CUSTOMER_TYPE = 'SET_CUSTOMER_TYPE';
export const SET_PROPERTY_TYPE = 'SET_PROPERTY_TYPE';
export const RESET_JOB_DATA = 'RESET_JOB_DATA';

export const setId = id => {
    return {
        type: SET_ID,
        id
    }
};

export const setOccupation = occupationId => {
    return {
        type: SET_OCCUPATION,
        occupationId
    }
};

export const setWorkType = workTypeId => {
    return {
        type: SET_WORK_TYPE,
        workTypeId
    }
}

export const setJobDescription = jobDescription => {
    return {
        type: SET_JOB_DESCRIPTION,
        jobDescription
    }
}

export const setStartTime = startTimeId => {
    return {
        type: SET_START_TIME,
        startTimeId
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

export const resetJobData = () => {
    return {
        type: RESET_JOB_DATA
    }
}