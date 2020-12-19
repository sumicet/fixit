import React, { useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigationState } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';

import Line from '../../components/common/Line';
import Grid from '../../components/layout/Grid';
import Header from '../../components/text/Header';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import { OCCUPATIONS } from '../../data/Jobs/Occupations';
import { CUSTOMER_TYPES } from '../../data/Jobs/CustomerTypes';
import { PROPERTY_TYPES } from '../../data/Jobs/PropertyTypes';
import { START_TIMES } from '../../data/Jobs/StartTimes';
import { WORK_TYPES } from '../../data/Jobs/WorkTypes';
import JobDescription from '../../components/quiz/JobDescription';
import JobAddress from '../../components/quiz/JobAddress';
import CustomRadioButton from '../../components/common/CustomRadioButton';
import MediumButton from '../../components/buttons/MediumButtom';
import { addJob, editJob } from '../../store/actions/job';
import Alert from '../../components/alert/Alert';
import ScrollableContainer from '../containers/ScrollableContainer';
import LineDescription from '../common/LineDescription';

const Quiz = props => {
    const { title, editModeOn, id, navigation, route } = props;

    useEffect(() => {
        if (isFocused) {
            props.navigation.setOptions({
                headerLeft: props => (
                    <HeaderBackButton
                        {...props}
                        onPress={() => {
                            backAction();
                        }}
                    />
                ),
            });
        }
    }, [isFocused]);

    const [alert, setAlert] = useState({
        title: null,
        message: null,
        text: null,
        hide: null,
        onlyShowOneButton: null,
        buttonColor: null,
        leftButtonText: null,
        onPress: null,
    });

    const [modalVisible, setModalVisible] = useState(false);

    const onAlertButtonPress = () => {
        setModalVisible(false);
    };

    const backAction = () => {
        setModalVisible(true);
        setAlert({
            title: 'Leave',
            message: 'Are you sure you want to leave this page?',
            text: 'Yes',
            hide: onAlertButtonPress,
            onlyShowOneButton: false,
            buttonColor: Color.tertiaryBrandColor,
            leftButtonText: 'Stay',
            onPress: onAlertRightButtonPress,
        });
        return true;
    };

    const onAlertRightButtonPress = () => {
        navigation.goBack();
        setModalVisible(false);
    };

    const isFocused = useIsFocused();

    // #back #howto #isFocused #backNotification

    useEffect(() => {
        if (isFocused) {
            BackHandler.addEventListener('hardwareBackPress', backAction);
        }
        return () => {
            if (isFocused) {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    backAction
                );
            }
        };
    }, [isFocused]);

    const jobToUpdate =
        editModeOn &&
        useSelector(state => state.job.userPendingJobs).find(
            elem => elem.id === id
        );

    const [index, setIndex] = useState(
        editModeOn ? jobToUpdate.occupationId - 1 : 0
    );
    const [workTypes, setWorkTypes] = useState([]);

    useEffect(() => {
        setWorkTypes(
            WORK_TYPES.filter(item =>
                editModeOn
                    ? item.occupationId === jobToUpdate.occupationId
                    : item.occupationId === 1
            )
        );
    }, [isFocused]);
    const dispatch = useDispatch();

    const initialChecked = (data, value) => {
        const initialChecked = [];
        var i;
        for (i = 0; i < data.length; i++) {
            if (i === value) {
                initialChecked.push(true);
            }
            initialChecked.push(false);
        }
        return initialChecked;
    };

    const [workTypeId, setWorkTypeId] = useState(
        editModeOn ? jobToUpdate.workTypeId : 1
    );
    const [customerTypeChecked, setCustomerTypeChecked] = useState(
        initialChecked(
            CUSTOMER_TYPES,
            editModeOn ? jobToUpdate.customerType - 1 : 0
        )
    );
    const [propertyTypeChecked, setPropertyTypeChecked] = useState(
        initialChecked(
            PROPERTY_TYPES,
            editModeOn ? jobToUpdate.propertyType - 1 : 0
        )
    );
    const [startTimesChecked, setStartTimesChecked] = useState(
        initialChecked(
            START_TIMES,
            editModeOn ? jobToUpdate.startTimeId - 1 : 0
        )
    );

    const [jobDescriptionInput, setJobDescriptionInput] = useState(
        editModeOn ? jobToUpdate.jobDescription : null
    );
    const onChangeJobDescription = updatedInput => {
        setJobDescriptionInput(updatedInput);
    };

    const [jobAddressInput, setJobAddressInput] = useState({
        line1: jobToUpdate ? jobToUpdate.jobAddress.line1 : null,
        line2: jobToUpdate ? jobToUpdate.jobAddress.line2 : null,
        place_id: null, // TODO add place_id
    });

    const handleJobAddressChange = line2 => {
        setJobAddressInput({
            line1: jobAddressInput.line1,
            line2: line2,
            place_id: jobAddressInput.place_id, // TODO add place_id
        });
    };

    const handleStreetAddressChange = (streetAddress, place_id) => {
        setJobAddressInput({
            line1: streetAddress,
            line2: jobAddressInput.line2,
            place_id: place_id, // TODO add place_id
        });
    };

    const handleToggleCheck = (index, checked, setChecked) => {
        const updatedChecked = [...checked];
        var i;
        for (i = 0; i < updatedChecked.length; i++) {
            if (i !== index) {
                updatedChecked[i] = false;
            } else {
                updatedChecked[i] = true;
            }
        }
        setChecked(updatedChecked);
    };

    const handleWorkTypePress = index => {
        setWorkTypeId(index + 1);
    };

    const handlePostJobPress = () => {
        const customerTypeId = customerTypeChecked.findIndex(item => item) + 1;
        const propertyTypeId = propertyTypeChecked.findIndex(item => item) + 1;
        const startTimeId = startTimesChecked.findIndex(item => item) + 1;
        const occupationId = index + 1;

        if (
            typeof occupationId === 'undefined' ||
            typeof workTypeId === 'undefined' ||
            typeof jobDescriptionInput === 'undefined' ||
            typeof customerTypeId === 'undefined' ||
            typeof propertyTypeId === 'undefined' ||
            typeof jobAddressInput.line1 === 'undefined' ||
            typeof jobAddressInput.line2 === 'undefined' ||
            typeof jobAddressInput.place_id === 'undefined' ||
            typeof startTimeId === 'undefined'
        ) {
            console.log(
                occupationId,
                workTypeId,
                jobDescriptionInput,
                customerTypeId,
                propertyTypeId,
                jobAddressInput.line1,
                jobAddressInput.line2,
                jobAddressInput.place_id,
                startTimeId
            );
            setAlert({
                title: 'A problem occured',
                message: 'Make sure all fields are filled.',
                text: 'Ok',
                hide: null,
                onlyShowOneButton: true,
                buttonColor: Color.textColor,
                leftButtonText: Color.textColor,
                onPress: onAlertButtonPress,
            });
            setModalVisible(true);
        } else {
            console.log(
                occupationId,
                workTypeId,
                jobDescriptionInput,
                customerTypeId,
                propertyTypeId,
                jobAddressInput.line1,
                jobAddressInput.line2,
                jobAddressInput.place_id,
                startTimeId
            );
            editModeOn
                ? dispatch(
                      editJob(
                          id,
                          occupationId,
                          workTypeId,
                          jobDescriptionInput,
                          customerTypeId,
                          propertyTypeId,
                          jobAddressInput,
                          startTimeId
                      )
                  )
                : dispatch(
                      addJob(
                          occupationId,
                          workTypeId,
                          jobDescriptionInput,
                          customerTypeId,
                          propertyTypeId,
                          jobAddressInput,
                          startTimeId
                      )
                  );
            navigation.navigate('MyJobs', {
                screen: 'MyJobs',
                params: {
                    isInAppNotificationVisible: true,
                },
            });
        }
    };

    return (
        <ScrollableContainer
            //title={title}
            backgroundColor={Color.primaryColor}
        >
            <View>
                <LineDescription text="What are you looking for?" />
                <Line style={{ flex: 0 }}>
                    <Grid
                        data={OCCUPATIONS}
                        onPress={index => {
                            setIndex(index);
                            setWorkTypes(
                                WORK_TYPES.filter(
                                    item => item.occupationId === index + 1
                                )
                            );
                        }}
                        initialSelectedIndexes={[
                            editModeOn ? jobToUpdate.occupationId - 1 : 0,
                        ]}
                    />
                </Line>
                {index !== 9 ? (
                    <View>
                        <LineDescription text="What kind of work do you need?" />
                        <Line style={{ flex: 0 }}>
                            <Grid
                                data={workTypes}
                                onPress={handleWorkTypePress}
                                initialSelectedIndexes={
                                    [editModeOn ? jobToUpdate.workTypeId - 1 : 0]
                                }
                            />
                        </Line>
                    </View>
                ) : null}
                <LineDescription text="Description" />
                <Line style={{ flex: 0 }}>
                    <JobDescription
                        input={jobDescriptionInput}
                        onChangeText={onChangeJobDescription}
                    />
                </Line>
                <LineDescription text="Where are you?" />
                <Line style={{ flex: 0 }}>
                    <JobAddress
                        input={jobAddressInput}
                        onStreetAddressChange={handleStreetAddressChange}
                        onChangeText={handleJobAddressChange}
                        streetAddress={jobAddressInput.line1}
                        initial_place_id={
                            jobToUpdate ? jobToUpdate.jobAddress.place_id : null
                        }
                    />
                </Line>
                <LineDescription text="I am a.." />
                <Line
                    style={{
                        flex: 0,
                        alignItems: 'flex-start',
                    }}
                >
                    <Grid
                        data={CUSTOMER_TYPES}
                        checked={customerTypeChecked}
                        onToggleCheck={index =>
                            handleToggleCheck(
                                index,
                                customerTypeChecked,
                                setCustomerTypeChecked
                            )
                        }
                        RenderItemComponent={CustomRadioButton}
                    />
                </Line>
                <LineDescription text="What type of property is the job for?" />
                <Line
                    style={{
                        flex: 0,
                        alignItems: 'flex-start',
                    }}
                >
                    <Grid
                        data={PROPERTY_TYPES}
                        checked={propertyTypeChecked}
                        onToggleCheck={index =>
                            handleToggleCheck(
                                index,
                                propertyTypeChecked,
                                setPropertyTypeChecked
                            )
                        }
                        RenderItemComponent={CustomRadioButton}
                    />
                </Line>
                <LineDescription text="When should the work start?" />
                <Line
                    style={{
                        flex: 0,
                        alignItems: 'flex-start',
                    }}
                >
                    <Grid
                        data={START_TIMES}
                        checked={startTimesChecked}
                        onToggleCheck={index =>
                            handleToggleCheck(
                                index,
                                startTimesChecked,
                                setStartTimesChecked
                            )
                        }
                        RenderItemComponent={CustomRadioButton}
                    />
                </Line>
                <Line
                    style={{
                        flex: 0,
                        paddingTop: Layout.screenHorizontalPadding,
                        paddingBottom: Layout.endOfPageSpace,
                    }}
                >
                    <MediumButton
                        text={editModeOn ? 'Finish' : 'Post job'}
                        onPress={handlePostJobPress}
                    />
                </Line>
            </View>
            <Alert
                modalVisible={modalVisible}
                onPress={alert.onPress}
                hide={alert.hide}
                title={alert.title}
                titleColor={Color.importantTextOnTertiaryColorBackground}
                message={alert.message}
                onlyShowOneButton={alert.onlyShowOneButton}
                buttonColor={alert.buttonColor}
                text={alert.text}
                leftButtonText={alert.leftButtonText}
            />
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default Quiz;
