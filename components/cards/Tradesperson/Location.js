import React from 'react';

import LocationIcon from '../../../assets/icons/Card/LocationIcon';
import CardIcon from './CardIcon';

const Location = props => {
    return (
        <CardIcon style={props.style} text={props.distance}>
            <LocationIcon />
        </CardIcon>
    );
};

export default Location;
