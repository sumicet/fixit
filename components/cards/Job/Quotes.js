import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';
import CardIcon from '../Tradesperson/CardIcon';

const Quotes = props => {
    return (
        <CardIcon style={props.style} text={props.quotes + ' quotes received'}>
            <Icon
                name="briefcase"
                color={Color.secondaryColor}
                size={Layout.cardIconSize}
            />
        </CardIcon>
    );
};

export default Quotes;
