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
import { setOccupation } from '../../store/actions/quiz';
import JobDescription from '../../components/quiz/JobDescription';
import JobAddress from '../../components/quiz/JobAddress';
import CustomRadioButton from '../../components/common/CustomRadioButton';

const QuizScreen = props => {
    const WORK_TYPES = useSelector(state => state.quiz.workTypes);

    const [index, setIndex] = useState();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            dispatch(setOccupation(1));
        }
    }, [isFocused]);

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

    const [customerTypeChecked, setCustomerTypeChecked] = useState(
        initialChecked(CUSTOMER_TYPES)
    );
    const [propertyTypeChecked, setPropertyTypeChecked] = useState(
        initialChecked(PROPERTY_TYPES)
    );
    const [startTimesChecked, setStartTimesChecked] = useState(
        initialChecked(START_TIMES)
    );

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
                            console.log(index);
                            setIndex(index);
                            dispatch(setOccupation(index + 1));
                        }}
                        initialSelectedIndex={0}
                    />
                </Line>
                {index !== 9 ? (
                    <View>
                        <LineDescription text="What kind of work do you need?" />
                        <Line style={{ flex: 0 }}>
                            <Grid data={WORK_TYPES} onPress={index => {}} />
                        </Line>
                    </View>
                ) : null}
                <LineDescription text="Description" />
                <Line style={{ flex: 0 }}>
                    <JobDescription />
                </Line>
                <LineDescription text="Where are you?" />
                <Line style={{ flex: 0 }}>
                    <JobAddress />
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
            </View>
        </TitledScrollableContainer>
    );
};

const styles = StyleSheet.create({});

export default QuizScreen;
