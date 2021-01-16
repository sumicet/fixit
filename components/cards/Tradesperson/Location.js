import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import LocationIcon from '../../../assets/icons/Card/LocationIcon';
import CardIcon from './CardIcon';
import { getText } from '../../../actions/distance';

const Location = props => {
    return (
        <CardIcon style={props.style} text={props.distance}>
            <LocationIcon />
        </CardIcon>
    );
};

export default Location;
