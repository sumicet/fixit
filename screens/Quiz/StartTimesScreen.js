import React from 'react';
import { useDispatch } from 'react-redux';

import QuizContainer from '../../components/quiz/QuizContainer';
import { START_TIMES } from '../../data/Jobs/StartTimes';
import { setStartTime } from '../../store/actions/quiz';
import CardData from '../../models/Quiz/CardData';

const StartTimesScreen = props => {
    var startTimes = [];

    const dispatch = useDispatch();

    var i;
    for (i = 1; i <= START_TIMES.length; i++) {
        const item = new CardData(
            i,
            null,
            START_TIMES.find(elem => elem.id === i).name
        );
        startTimes.push(item);
    }

    const handleCardPress = id => {
        if (id) {
            dispatch(setStartTime(id));
            props.navigation.navigate('Home', {
                isInAppNotificationVisible: true,
            });
        }
    };

    return (
        <QuizContainer
            title="What should the work start?"
            data={startTimes}
            handleCardPress={handleCardPress}
        />
    );
};

export default StartTimesScreen;
