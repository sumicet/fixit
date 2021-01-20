import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Color from '../../../constants/Color';
import SmallContent from '../../text/SmallContent';
import { START_TIMES } from '../../../data/Jobs/StartTimes';

const StartTime = props => {
    const startTime = START_TIMES.find(elem => elem.id === props.startTimeId)
        ?.name;

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
                        : Color.textField
                }
            />
            <SmallContent
                style={{
                    color:
                        props.startTimeId === 1 || props.startTimeId === 2
                            ? Color.error
                            : props.startTimeId === 3 || props.startTimeId === 4
                            ? Color.warning
                            : Color.textField,
                    fontFamily: 'Asap-Regular',
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
