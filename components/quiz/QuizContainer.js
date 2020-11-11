import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import OccupationCard from '../cards/OccupationCard';
import Layout from '../../constants/Layout';
import Touchable from '../common/Touchable';
import QuizScreen from '../containers/QuizScreen';

const QuizContainer = props => {
    const renderData = itemData => {
        return (
            <Touchable isCard={true} onPress={() => props.handleCardPress(itemData.item.id)}>
                <OccupationCard
                    name={itemData.item.name}
                    style={
                        itemData.item.name
                            ? { height: 120 }
                            : { height: 120, borderWidth: 0 }
                    }
                >
                    {itemData.item.icon}
                </OccupationCard>
            </Touchable>
        );
    };

    return (
        <QuizScreen title={props.title}>
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
