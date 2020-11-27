import React from 'react';

import LocationIcon from '../../../assets/icons/Card/LocationIcon';
import CardIcon from './CardIcon';

const Location = props => {
    return (
        <CardIcon style={props.style} text="25km">
            <LocationIcon />
        </CardIcon>
    );
};

export default Location;
