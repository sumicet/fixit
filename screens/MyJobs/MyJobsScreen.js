import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import QuizScreen from '../../components/containers/QuizScreen';
import JobCard from '../../components/cards/Job/JobCard';
import Layout from '../../constants/Layout';
import Touchable from '../../components/common/Touchable';

const MyJobsScreen = props => {
    return (
        <QuizScreen
            title="My jobs"
            centerTitle={true}
            style={{ paddingHorizontal: Layout.screenHorizontalPadding }}
        >
            <Touchable isCard={true} style={{ flex: 0 }} onPress={() => {props.navigation.navigate('JobDetails')}}>
                <JobCard />
            </Touchable>
            <Touchable isCard={true} style={{ flex: 0 }} onPress={() => {}}>
                <JobCard />
            </Touchable>
            <Touchable isCard={true} style={{ flex: 0 }} onPress={() => {}}>
                <JobCard />
            </Touchable>
        </QuizScreen>
    );
};

const styles = StyleSheet.create({});

export default MyJobsScreen;
