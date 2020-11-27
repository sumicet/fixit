import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Color from '../../../constants/Color';
import SmallContent from '../../text/SmallContent';
import { START_TIMES } from '../../../data/Jobs/StartTimes';

const StartTime = props => {
    const startTime = START_TIMES.find(elem => elem.id === props.startTimeId)
        .name;

    return (
        <View style={styles.container}>
            <Icon
                name="clock"
                size={18}
                color={
                    startTime === 'Today'
                        ? Color.urgent
                        : props.color
                        ? props.color
                        : Color.secondaryColor
                }
            />
            <SmallContent
                style={{
                    color:
                        startTime === 'Today'
                            ? Color.urgent
                            : props.color
                            ? props.color
                            : Color.secondaryColor,
                    fontFamily:
                        startTime === 'Today'
                            ? 'asap-semibold'
                            : 'asap-regular',
                }}
            >
                {' '}
                {startTime}
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
