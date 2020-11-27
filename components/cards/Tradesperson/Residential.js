import React from 'react';

import HouseIcon from '../../../assets/icons/Properties/HouseIcon';
import CardIcon from './CardIcon';

const Residential = props => {
    return (
        <CardIcon style={props.style} text="residential work">
            <HouseIcon />
        </CardIcon>
    );
};

export default Residential;
