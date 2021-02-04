import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Color from '../../../constants/Color';
import SmallContent from '../../text/SmallContent';
import { START_TIMES } from '../../../data/Jobs/StartTimes';
import { date } from 'yup';
import { getStartTime } from '../../../actions/startTime';

const StartTime = props => {
    // const startTime = START_TIMES.find(elem => elem.id === props.startTimeId)
    //     .name;

    const {startTime, color} = getStartTime(props.date, props.startTimeId);

    return (
        <View style={styles.container}>
            <Icon
                name="clock"
                size={18}
                color={
                    props.startTimeId === 1 || props.startTimeId === 2
                        ? Color.error
                        : props.startTimeId === 3 || props.startTimeId === 4
                        ? Color.warning
                        : Color.secondaryColor
                }
            />
            <SmallContent
                style={{
                    color: color,
                    fontFamily: 'Regular',
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
