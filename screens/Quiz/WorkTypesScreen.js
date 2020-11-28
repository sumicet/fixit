import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CardData from '../../models/Quiz/CardData';
import QuizContainer from '../../components/quiz/QuizContainer';
import { setWorkType } from '../../store/actions/quiz';

const WorkTypesScreen = props => {
    var workTypes = [];

    const dispatch = useDispatch();

    const selectedJobWorkTypes = useSelector(state => state.quiz.workTypes);
    
    var i;
    for (i = 1; i <= selectedJobWorkTypes.length; i++) {
        const item = new CardData(
            i,
            null,
            selectedJobWorkTypes.find(elem => elem.id === i).name
        );
        workTypes.push(item);
    }

    const handleCardPress = id => {
        dispatch(setWorkType(id));
        props.navigation.navigate('JobDescription', {
            action: 'edit'
        });
    };

    const handleNextPress = id => {
        props.navigation.navigate('JobDescription', {
            action: 'edit'
        });
    }

    return (
        <QuizContainer
            title="What kind of work do you need?"
            data={workTypes}
            handleCardPress={handleCardPress}
            showNextButton={
                props.route.params && props.route.params.action === 'edit' ? true : false
            }
            onPress={handleNextPress}
            routeName={props.route.name}
        />
    );
};

const styles = StyleSheet.create({});

export default WorkTypesScreen;
