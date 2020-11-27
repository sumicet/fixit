import React from 'react';

import CompletedJobsIcon from '../../../assets/icons/Card/CompletedJobsIcon';
import CardIcon from './CardIcon';

const CompletedJobs = props => {
    return (
        <CardIcon style={props.style} text="140 completed jobs">
            <CompletedJobsIcon />
        </CardIcon>
    );
};

export default CompletedJobs;
