import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import LocationIcon from '../../../assets/icons/Card/LocationIcon';
import CardIcon from './CardIcon';
import { getDistance } from '../../../actions/distance';

const Location = props => {
    const user_place_id = useSelector(state => state.tradesperson.streetAddress)
        .place_id;
    const [text, setText] = useState();

    const getText = async (origin, destination) => {
        const { status, meters } = await getDistance(origin, destination);

        if (status === 'OK') {
            if (meters < 1000) {
                setText('<1km');
            } else {
                if (meters >= 1000 && meters <= 100000) {
                    setText(meters / 1000);
                } else {
                    setText('far');
                }
            }
        } else {
            setText('?');
        }
    };

    useEffect(() => {
        getText(user_place_id, props.place_id);
    }, []);

    return (
        <CardIcon style={props.style} text={text}>
            <LocationIcon />
        </CardIcon>
    );
};

export default Location;
