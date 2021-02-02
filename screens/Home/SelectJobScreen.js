import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import JobList from '../../components/cards/Job/JobList';
import Line from '../../components/common/Line';
import Touchable from '../../components/common/Touchable';
import Container from '../../components/containers/Container';
import SmallContent from '../../components/text/SmallContent';
import { ERROR, SUCCESS, WARNING } from '../../constants/Actions';
import Color from '../../constants/Color';
import { setInAppNotification } from '../../store/actions/ui';
import Alert from '../../components/alert/Alert';
import { sendRequest } from '../../store/actions/job';

const SelectJobScreen = props => {
    const userPendingJobs = useSelector(state => state.job.userPendingJobs);
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [jobId, setJobId] = useState();
    const tradespersonId =
        props.route.params && props.route.params.tradespersonId;
    const currentUserId = useSelector(state => state.auth.userId);

    const quotes = useSelector(state => state.job.quotes);
    const requests = useSelector(state => state.job.requests);

    const sentQuoteOrRequest = () => {
        dispatch(sendRequest(jobId, currentUserId, tradespersonId)).then(() => {
            dispatch(
                setInAppNotification(
                    'Sent',
                    'A quote request has been sent.',
                    SUCCESS
                )
            );
            props.navigation.goBack();
        });
    };

    const handlePress = () => {
        const oldRequest = requests.find(
            request =>
                request.jobId === jobId &&
                request.tradespersonId === tradespersonId
        );

        if (oldRequest) {
            var elapsed = Math.abs(Date.now() - new Date(oldRequest.date));
            var msPerMinute = 60 * 1000;
            var msPerHour = msPerMinute * 60;
            var msPerDay = msPerHour * 24;

            var timeLeft;

            if (msPerDay - elapsed < msPerMinute) {
                timeLeft = `${Math.round((msPerDay - elapsed) / 1000)} seconds`;
            } else {
                if (msPerDay - elapsed < msPerHour) {
                    timeLeft = `${Math.round(
                        (msPerDay - elapsed) / msPerMinute
                    )} minutes`;
                } else {
                    if (msPerDay - elapsed < msPerDay) {
                        timeLeft = `${Math.round(
                            (msPerDay - elapsed) / msPerHour
                        )} hours`;
                    }
                }
            }

            if (elapsed < msPerDay) {
                setModalVisible(false);
                dispatch(
                    setInAppNotification(
                        'Too many requests!',
                        'You have already sent a request towards this tradesperson. Try again in ' +
                            timeLeft +
                            '.',
                        ERROR
                    )
                );
            } else {
                sentQuoteOrRequest();
            }
        } else {
            sentQuoteOrRequest();
        }
    };

    return (
        <Container
            style={{ paddingTop: 0, marginTop: 0, paddingHorizontal: 0 }}
        >
            <Alert
                modalVisible={modalVisible}
                onPress={() => handlePress()}
                hide={() => {
                    setModalVisible(false);
                }}
                title="Request quote"
                titleColor={Color.urgent}
                message="Are you sure you want to request a quote for this job?"
                style={WARNING}
            />
            {userPendingJobs && userPendingJobs.length > 0 ? (
                <JobList
                    title="In order to ask for a quote, you must select a job from the list below."
                    list={userPendingJobs}
                    navigation={props.navigation}
                    onCardPress={jobId => {
                        setModalVisible(true);
                        setJobId(jobId);
                    }}
                />
            ) : (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: Color.primaryColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Line style={{ flex: 0 }}>
                        <SmallContent
                            style={{
                                color:
                                    Color.importantTextOnTertiaryColorBackground,
                            }}
                        >
                            You must add a job before requesting a quote.
                        </SmallContent>
                    </Line>
                    <Touchable
                        style={{
                            flex: 0,
                            borderRadius: 100,
                            backgroundColor: Color.primaryBrandColor,
                            height: 100,
                            width: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            props.navigation.navigate('NewJob');
                        }}
                    >
                        <Icon
                            name="plus"
                            color={Color.importantTextOnTertiaryColorBackground}
                            size={30}
                        />
                    </Touchable>
                </View>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({});

export default SelectJobScreen;
