import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Shield from 'react-native-vector-icons/MaterialCommunityIcons';

import SmallContent from '../../text/SmallContent';
import Color from '../../../constants/Color';
import CompletedJobsIcon from '../../../assets/icons/Card/CompletedJobsIcon';

const CompletedJobs = props => {
    return (
        <View
            style={[
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                },
                props.style,
            ]}
        >
            <CompletedJobsIcon />
            <SmallContent style={{ color: Color.secondaryColor }}>
                {' '}
                140 completed jobs
            </SmallContent>
        </View>
    );
};

const styles = StyleSheet.create({});

export default CompletedJobs;
