import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import JobCard from '../../components/cards/Job/JobCard';
import Touchable from '../../components/common/Touchable';
import * as Job from '../../store/actions/job';
import { useIsFocused } from '@react-navigation/native';
import InAppNotification from '../../components/alert/InAppNotification';
import Empty from '../../components/empty/Empty';
import Color from '../../constants/Color';
import ScrollableContainer from '../../components/containers/ScrollableContainer';
import Container from '../../components/containers/Container';

const MyJobsScreen = props => {
    const userPendingJobs = useSelector(
        state => state.job.userPendingJobs
    ).sort((a, b) => a.date < b.date);
    const userInProgressJobs = useSelector(
        state => state.job.userInProgressJobs
    );
    const userFinishedJobs = useSelector(state => state.job.userFinishedJobs);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [inAppNotificationVisible, setInAppNotificationVisible] = useState(
        false
    );
    const [inAppNotificationBody, setInAppNotificationBody] = useState({
        title: null,
        message: null,
    });

    const handleHideInAppNotification = () => {
        setInAppNotificationVisible(false);
    };

    const closeInAppNotificationAfterTimerExpires = async () => {
        setTimeout(() => {
            handleHideInAppNotification();
        }, 5000);
    };

    useEffect(() => {
        if (
            isFocused &&
            props.route.params &&
            props.route.params.action === 'delete'
        ) {
            dispatch(Job.fetchMyJobs());
            setInAppNotificationBody({
                title: 'Done',
                message: 'The job has been successfully deleted.',
            });
            setInAppNotificationVisible(true);
            props.navigation.setParams({ action: 'none' });
            closeInAppNotificationAfterTimerExpires();
        }
    }, [props, isFocused]);

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
                    userId={item.userId}
                    date={item.date}
                    occupationId={item.occupationId}
                    workTypeId={item.workTypeId}
                    jobDescription={item.jobDescription}
                    customerType={item.customerType}
                    propertyType={item.propertyType}
                    jobAddress={item.jobAddress}
                    startTimeId={item.startTimeId}
                />
            </Touchable>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: Color.primaryColor }}>
            {userPendingJobs.length > 0 ? (
                <Container
                    backgroundColor={Color.primaryColor}
                    style={{ flex: 1 }}
                >
                    <FlatList
                        keyExtractor={(item, i) => `key-${i}`}
                        data={userPendingJobs}
                        renderItem={renderItem}
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
