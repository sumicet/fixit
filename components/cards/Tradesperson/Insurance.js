import React from 'react';
import Shield from 'react-native-vector-icons/MaterialCommunityIcons';

import Color from '../../../constants/Color';
import Layout from '../../../constants/Layout';
import CardIcon from './CardIcon';

const Insurance = props => {
    return (
        <CardIcon
            style={[{ paddingLeft: Layout.generalPadding }, props.style]}
            text="liability insurance"
        >
            <Shield
                name="shield-check"
                color={Color.secondaryColor}
                size={17}
            />
        </CardIcon>
    );
};

export default Insurance;
