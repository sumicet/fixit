import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Color from '../../constants/Color';
import SmallContent from '../text/SmallContent';

const StreetAddress = props => {
    return (
        <View style={styles.container}>
            <SmallContent style={{ color: Color.secondaryColor }}>
                {' '}
                • 46 Bideford Rd
            </SmallContent>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default StreetAddress;
