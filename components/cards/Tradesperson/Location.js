import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../../constants/Color';
import SmallContent from '../../text/SmallContent';

const Location = props => {
    return (
        <View style={styles.container}>
            <Icon name="location-on" size={18} color={Color.secondaryColor} />
            <SmallContent style={{ color: Color.secondaryColor }}>
                25km
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

export default Location;
