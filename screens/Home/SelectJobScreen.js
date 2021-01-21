import React, { useEffect } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import JobList from '../../components/cards/Job/JobList';
import Line from '../../components/common/Line';
import Touchable from '../../components/common/Touchable';
import Container from '../../components/containers/Container';
import SmallContent from '../../components/text/SmallContent';
import { SUCCESS } from '../../constants/Actions';
import Color from '../../constants/Color';
import { setInAppNotification } from '../../store/actions/ui';

const SelectJobScreen = props => {
    const userPendingJobs = useSelector(state => state.job.userPendingJobs);
    const dispatch = useDispatch();

    return (
        <Container style={{ paddingTop: 0, marginTop: 0 }}>
            {userPendingJobs && userPendingJobs.length > 0 ? (
                <JobList
                    title="Please select a job to receive a quote"
                    list={userPendingJobs}
                    navigation={props.navigation}
                    onCardPress={jobId => {
                        props.navigation.goBack();
                        // dispatch smth with jobId
                        // TODO ask user if it's ok to send
                        dispatch(
                            setInAppNotification(
                                'Sent',
                                'A quote request has been sent.',
                                SUCCESS
                            )
                        );
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
                            props.navigation.navigate('NewJob')
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
