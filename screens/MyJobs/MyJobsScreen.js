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

    useEffect(() => {
        if (
            isFocused &&
            props.route.params &&
            props.route.params.action === 'delete'
        ) {
            dispatch(Job.fetchMyJobs(currentUserId)).then(() => {
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

    return (
        <View style={{ flex: 1, backgroundColor: Color.primaryColor }}>
            {userPendingJobs && userPendingJobs.length > 0 ? (
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
                        list={userPendingJobs.concat(userCompletedJobs)} //TODO change this to completed jobs
                        navigation={props.navigation}
                        showSecondTitleAtElementWithIndex={
                            userPendingJobs ? userPendingJobs.length : 0
                        }
                    />
                </Container>
            ) : (
                <Empty />
            )}
        </View>
    );
};

const styles = StyleSheet.create({});

export default MyJobsScreen;
