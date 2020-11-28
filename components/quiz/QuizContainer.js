import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import OccupationCard from '../cards/OccupationCard';
import Layout from '../../constants/Layout';
import Touchable from '../common/Touchable';
import QuizScreen from '../containers/QuizScreen';
import Color from '../../constants/Color';

const QuizContainer = props => {
    const id = useSelector(state => state.quiz.id);
    const occupationId = useSelector(state => state.quiz.occupationId);
    const workTypeId = useSelector(state => state.quiz.workTypeId);
    const startTimeId = useSelector(state => state.quiz.startTimeId);
    const customerType = useSelector(state => state.quiz.customerType);
    const propertyType = useSelector(state => state.quiz.propertyType);

    const renderData = itemData => {
        return (
            <Touchable
                isCard={true}
                onPress={() => props.handleCardPress(itemData.item.id)}
            >
                <OccupationCard
                    name={itemData.item.name}
                    style={[
                        {
                            backgroundColor:
                                (props.routeName === 'Occupations' &&
                                    occupationId === itemData.item.id) ||
                                (props.routeName === 'WorkTypes' &&
                                    workTypeId === itemData.item.id) ||
                                (props.routeName === 'CustomerTypes' &&
                                    customerType === itemData.item.id) ||
                                (props.routeName === 'StartTimes' &&
                                    startTimeId === itemData.item.id) ||
                                (props.routeName === 'PropertyTypes' &&
                                    propertyType === itemData.item.id)
                                    ? Color.secondaryBrandColor
                                    : Color.textField,
                        },
                        itemData.item.name
                            ? { height: 120 }
                            : {
                                  height: 120,
                                  backgroundColor: Color.primaryColor,
                              },
                    ]}
                >
                    {itemData.item.icon}
                </OccupationCard>
            </Touchable>
        );
    };

    return (
        <QuizScreen
            title={props.title}
            showNextButton={props.showNextButton}
            onPress={props.onPress}
        >
            <FlatList
                data={props.data}
                keyExtractor={(item, index) => item.id}
                renderItem={renderData}
                numColumns={2}
                horizontal={false}
                style={styles.flatlist}
            />
        </QuizScreen>
    );
};

const styles = StyleSheet.create({
    flatlist: {
        flex: 1,
        paddingHorizontal:
            Layout.screenHorizontalPadding - Layout.generalPadding,
    },
});

export default QuizContainer;
