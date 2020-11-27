import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import QuizScreen from '../../components/containers/QuizScreen';
import JobCard from '../../components/cards/Job/JobCard';
import Layout from '../../constants/Layout';
import Touchable from '../../components/common/Touchable';
import * as Job from '../../store/actions/job';
import Color from '../../constants/Color';

const MyJobsScreen = props => {
    const userPendingJobs = useSelector(state => state.job.userPendingJobs);
    const userInProgressJobs = useSelector(
        state => state.job.userInProgressJobs
    );
    const userFinishedJobs = useSelector(state => state.job.userFinishedJobs);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Job.fetchMyJobs());
    }, []);

    const renderItem = ({ item }) => {
        return (
            <Touchable
                isCard={true}
                style={{ flex: 0 }}
                onPress={() => {
                    props.navigation.navigate('JobDetails', { id: item.id });
                }}
            >
                <JobCard
                    date={item.date}
                    occupationId={item.occupationId}
                    workTypeId={item.workTypeId}
                    jobDescription={item.jobDescription}
                    startTimeId={item.startTimeId}
                />
            </Touchable>
        );
    };

    return (
        <QuizScreen
            title="My jobs"
            centerTitle={true}
            style={{ paddingHorizontal: Layout.screenHorizontalPadding }}
        >
            <FlatList
                keyExtractor={item => item.id}
                data={userPendingJobs}
                renderItem={renderItem}
            />
        </QuizScreen>
    );
};

const styles = StyleSheet.create({});

export default MyJobsScreen;
