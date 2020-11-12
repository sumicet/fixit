import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Color from '../../../constants/Color';
import SmallContent from '../../text/SmallContent';

const StartTime = props => {

    const startTime = 'urgent';

    return (
        <View style={styles.container}>
            <Icon name="clock" size={18} color={Color.secondaryColor} />
            <SmallContent style={{ color: startTime === 'urgent' ? Color.urgent : Color.secondaryColor }}>
                {' '}{startTime}
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

export default StartTime;
