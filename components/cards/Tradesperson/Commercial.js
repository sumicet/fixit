import React from 'react';

import StoreIcon from '../../../assets/icons/Properties/StoreIcon';
import CardIcon from './CardIcon';

const Commercial = props => {
    return (
        <CardIcon style={props.style} text="commercial work">
            <StoreIcon />
        </CardIcon>
    );
};

export default Commercial;
