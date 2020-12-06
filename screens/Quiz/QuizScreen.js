import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import Line from '../../components/common/Line';
import TitledScrollableContainer from '../../components/containers/TitledScrollableContainer';
import Grid from '../../components/layout/Grid';
import Header from '../../components/text/Header';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import { OCCUPATIONS } from '../../data/Jobs/Occupations';
import { CUSTOMER_TYPES } from '../../data/Jobs/CustomerTypes';
import { PROPERTY_TYPES } from '../../data/Jobs/PropertyTypes';
import { START_TIMES } from '../../data/Jobs/StartTimes';
import { WORK_TYPES } from '../../data/Jobs/WorkTypes';
import { setOccupation } from '../../store/actions/quiz';
import JobDescription from '../../components/quiz/JobDescription';
import JobAddress from '../../components/quiz/JobAddress';
import CustomRadioButton from '../../components/common/CustomRadioButton';
import MediumButton from '../../components/buttons/MediumButtom';
import Job from '../../models/Jobs/Job';
import { addJob } from '../../store/actions/job';
import Alert from '../../components/alert/Alert';

const QuizScreen = props => {
    const job = new Job(
        useSelector(state => state.quiz.id),
        -1,
        null,
        useSelector(state => state.quiz.occupationId),
        useSelector(state => state.quiz.workTypeId),
        useSelector(state => state.quiz.jobDescription),
        useSelector(state => state.quiz.customerType),
        useSelector(state => state.quiz.propertyType),
        useSelector(state => state.quiz.jobAddress),
        useSelector(state => state.quiz.startTimeId)
    );

    const [index, setIndex] = useState(0);
    const [workTypes, setWorkTypes] = useState(
        WORK_TYPES.filter(item => item.occupationId === 1)
    );

    console.log(workTypes);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const LineDescription = props => {
        return (
            <Line style={{ flex: 0, alignItems: 'flex-start' }}>
                <Header style={{ color: Color.primaryBrandColor }}>
                    {props.text}
                </Header>
            </Line>
        );
    };

    const initialChecked = data => {
        const initialChecked = [];
        var i;
        initialChecked.push(true);
        for (i = 1; i < data.length; i++) {
            initialChecked.push(false);
        }
        return initialChecked;
    };

    const [workTypeId, setWorkTypeId] = useState();
    const [customerTypeChecked, setCustomerTypeChecked] = useState(
        initialChecked(CUSTOMER_TYPES)
    );
    const [propertyTypeChecked, setPropertyTypeChecked] = useState(
        initialChecked(PROPERTY_TYPES)
    );
    const [startTimesChecked, setStartTimesChecked] = useState(
        initialChecked(START_TIMES)
    );

    const [jobDescriptionInput, setJobDescriptionInput] = useState();
    const onChangeJobDescription = updatedInput => {
        setJobDescriptionInput(updatedInput);
    };

    const [jobAddressInput, setJobAddressInput] = useState({
        line1: null,
        line2: null,
        place_id: null, // TODO add place_id
    });

    const [modalVisible, setModalVisible] = useState(false);

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
            !occupationId ||
            !workTypeId ||
            !jobDescriptionInput ||
            !customerTypeId ||
            !propertyTypeId ||
            !jobAddressInput.line1 ||
            !jobAddressInput.line2 ||
            !jobAddressInput.place_id ||
            !startTimeId
        ) {
            setModalVisible(true);
        } else {
            dispatch(
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
            props.navigation.navigate('Home', {
                screen: 'Home',
                params: {
                    isInAppNotificationVisible: true,
                },
            });
        }
    };

    return (
        <TitledScrollableContainer
            title={'New'}
            backgroundColor={Color.primaryColor}
        >
            <View style={{ paddingHorizontal: Layout.screenVerticalPadding }}>
                <LineDescription text="What are you looking for?" />
                <Line style={{ flex: 0 }}>
                    <Grid
                        data={OCCUPATIONS}
                        onPress={index => {
                            setIndex(index);
                            setWorkTypes(
                                WORK_TYPES.filter(
                                    item => item.occupationId === index
                                )
                            );
                        }}
                        initialSelectedIndex={0}
                    />
                </Line>
                {index !== 9 ? (
                    <View>
                        <LineDescription text="What kind of work do you need?" />
                        <Line style={{ flex: 0 }}>
                            <Grid
                                data={workTypes}
                                onPress={handleWorkTypePress}
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
                        text="Post job"
                        onPress={handlePostJobPress}
                    />
                </Line>
            </View>
            <Alert
                modalVisible={modalVisible}
                onPress={() => {
                    setModalVisible(false);
                }}
                hide={() => {}}
                title="A problem occured"
                titleColor={Color.importantTextOnTertiaryColorBackground}
                message="Make sure all fields are filled."
                onlyShowOneButton={true}
                buttonColor={Color.importantTextOnTertiaryColorBackground}
                text="Ok"
            />
        </TitledScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default QuizScreen;
