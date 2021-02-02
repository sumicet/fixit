import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as Job from '../../store/actions/job';
import { useIsFocused } from '@react-navigation/native';
import Empty from '../../components/empty/Empty';
import Color from '../../constants/Color';
import Container from '../../components/containers/Container';
import { setInAppNotification } from '../../store/actions/ui';
import { SUCCESS } from '../../constants/Actions';
import JobList from '../../components/cards/Job/JobList';

const MyJobsScreen = props => {
    const currentUserId = useSelector(state => state.auth.userId);
    const userPendingJobs = useSelector(
        state => state.job.userPendingJobs
    ).sort((a, b) => a.date < b.date);
    const userCompletedJobs = useSelector(state => state.job.userCompletedJobs);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const userType = useSelector(state => state.auth.userType);
    const requests = userCompletedJobs.filter(job => job.requests);

    useEffect(() => {
        if (
            isFocused &&
            props.route.params &&
            props.route.params.action === 'delete'
        ) {
            dispatch(Job.fetchMyJobs(currentUserId, userType)).then(() => {
                dispatch(
                    setInAppNotification(
                        'Deleted',
                        'The job has been successfully deleted.',
                        SUCCESS
                    )
                );
            });
            props.navigation.setParams({ action: 'none' });
        }
    }, [props, isFocused]);

    const Screen = props => {
        const { mainArray, secondaryArray } = props;

        return (
            <View style={{ flex: 1, backgroundColor: Color.primaryColor }}>
                {mainArray && mainArray.length > 0 ? (
                    <Container
                        backgroundColor={Color.primaryColor}
                        style={{
                            flex: 1,
                            paddingTop: 0,
                            marginTop: 0,
                            paddingHorizontal: 0,
                        }}
                    >
                        <JobList
                            list={mainArray
                                .sort(
                                    (job1, job2) =>
                                        new Date(job2.date) -
                                        new Date(job1.date)
                                )
                                .concat(
                                    secondaryArray.sort(
                                        (job1, job2) =>
                                            new Date(job2.date) -
                                            new Date(job1.date)
                                    )
                                )} // sorts by newest first
                            navigation={props.navigation}
                            showSecondTitleAtElementWithIndex={
                                mainArray ? mainArray.length : 0
                            }
                            onCardPress={id => {
                                props.navigation.navigate(
                                    'MyJobsStackWithoutCustomHeader',
                                    {
                                        screen: 'JobDetails',
                                        params: {
                                            id,
                                        },
                                    }
                                );
                            }}
                        />
                    </Container>
                ) : (
                    <Empty />
                )}
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {userType === 'tradesperson' ? (
                <Screen mainArray={requests} navigation={props.navigation} />
            ) : (
                <Screen
                    mainArray={userPendingJobs}
                    secondaryArray={userCompletedJobs}
                    navigation={props.navigation}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({});

export default MyJobsScreen;
