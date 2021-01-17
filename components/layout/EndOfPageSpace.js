import React from 'react';
import { View, StyleSheet } from 'react-native';

import Color from '../../constants/Color';

const EndOfPageSpace = props => {
    return (
        <View
            style={{
                backgroundColor: Color.primaryColor,
                height: 100,
                width: '100%',
            }}
        />
    );
};

export default EndOfPageSpace;
