import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import QuizScreen from '../../components/containers/QuizScreen';
import JobCard from '../../components/cards/Job/JobCard';
import Layout from '../../constants/Layout';
import Touchable from '../../components/common/Touchable';
import * as Job from '../../store/actions/job';
import { useIsFocused } from '@react-navigation/native';
import InAppNotification from '../../components/alert/InAppNotification';
import Empty from '../../components/empty/Empty';
import TitledScrollableContent from '../../components/containers/TitledScrollableContainer';
import Color from '../../constants/Color';

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
        <TitledScrollableContent
            title={'My Jobs'}
            backgroundColor={Color.primaryColor}
        >
            <View style={{ paddingHorizontal: Layout.generalPadding }}>
                {userPendingJobs.length !== 0 ? (
                    <FlatList
                        keyExtractor={item => item.id}
                        data={userPendingJobs}
                        renderItem={renderItem}
                    />
                ) : (
                    <Empty />
                )}
                <InAppNotification
                    title={inAppNotificationBody.title}
                    message={inAppNotificationBody.message}
                    inAppNotificationVisible={inAppNotificationVisible}
                    hide={handleHideInAppNotification}
                />
            </View>
        </TitledScrollableContent>
    );
};

const styles = StyleSheet.create({});

export default MyJobsScreen;
