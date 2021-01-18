import React, { useEffect } from 'react';

import ExperienceIcon from '../../../assets/icons/User/ExperienceIcon';
import Layout from '../../../constants/Layout';
import { EXPERIENCE } from '../../../data/Tradesperson/Experience';
import CardIcon from './CardIcon';

const Experience = props => {
    const { experienceId } = props;

    return (
        <CardIcon
            style={[{ paddingLeft: Layout.generalPadding }, props.style]}
            text={EXPERIENCE.find(elem => elem.id === experienceId)?.name}
        >
            <ExperienceIcon />
        </CardIcon>
    );
};

export default Experience;
