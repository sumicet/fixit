import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import QuizContainer from '../../components/quiz/QuizContainer';
import { START_TIMES } from '../../data/Jobs/StartTimes';
import { setStartTime } from '../../store/actions/quiz';
import CardData from '../../models/Quiz/CardData';
import * as Job from '../../store/actions/job';

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

    const id = useSelector(state => state.quiz.id);
    const occupationId = useSelector(state => state.quiz.occupationId);
    const workTypeId = useSelector(state => state.quiz.workTypeId);
    const jobDescription = useSelector(state => state.quiz.jobDescription);
    const customerType = useSelector(state => state.quiz.customerType);
    const propertyType = useSelector(state => state.quiz.propertyType);
    const jobAddress = useSelector(state => state.quiz.jobAddress);
    const startTimeId = useSelector(state => state.quiz.startTimeId);

    const handleCardPress = async id => {
        if (props.route.params && props.route.params.action === 'edit') {
            dispatch(setStartTime(id));
            handleNextPress();
        } else {
            if (id) {
                dispatch(setStartTime(id));

                const startTimeId = id;

                dispatch(
                    Job.addJob(
                        occupationId,
                        workTypeId,
                        jobDescription,
                        customerType,
                        propertyType,
                        jobAddress,
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
        }
    };

    const handleNextPress = async () => {
        if (id) {
            dispatch(
                Job.editJob(
                    id,
                    occupationId,
                    workTypeId,
                    jobDescription,
                    customerType,
                    propertyType,
                    jobAddress,
                    startTimeId
                )
            );

            props.navigation.navigate('JobDetails', {
                id: id,
                isInAppNotificationVisible: true,
            });
        }
    };

    return (
        <QuizContainer
            title="When should the work start?"
            data={startTimes}
            handleCardPress={handleCardPress}
            showNextButton={
                props.route.params && props.route.params.action === 'edit'
                    ? true
                    : false
            }
            onPress={handleNextPress}
            routeName={props.route.name}
        />
    );
};

export default StartTimesScreen;
