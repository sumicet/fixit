import React from 'react';

import FactoryIcon from '../../../assets/icons/Properties/FactoryIcon';
import CardIcon from './CardIcon';

const Industrial = props => {
    return (
        <CardIcon style={props.style} text="industrial work">
            <FactoryIcon />
        </CardIcon>
    );
};

export default Industrial;
