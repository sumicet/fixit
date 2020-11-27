import React from 'react';

import ExperienceIcon from '../../../assets/icons/User/ExperienceIcon';
import Layout from '../../../constants/Layout';
import CardIcon from './CardIcon';

const Experience = props => {
    return (
        <CardIcon
            style={[{ paddingLeft: Layout.generalPadding }, props.style]}
            text="10y"
        >
            <ExperienceIcon />
        </CardIcon>
    );
};

export default Experience;
