import React from 'react';
import { useDispatch } from 'react-redux';

import QuizContainer from '../../components/quiz/QuizContainer';
import { CUSTOMER_TYPES } from '../../data/Jobs/CustomerTypes';
import { setCustomerType } from '../../store/actions/quiz';
import CardData from '../../models/Quiz/CardData';

const CustomerTypesScreen = props => {
    var customerType = [];

    const dispatch = useDispatch();

    var i;
    for (i = 1; i <= CUSTOMER_TYPES.length; i++) {
        const item = new CardData(
            i,
            null,
            CUSTOMER_TYPES.find(elem => elem.id === i).name
        );
        customerType.push(item);
    }

    const handleCardPress = id => {
        dispatch(setCustomerType(id));
        props.navigation.navigate('PropertyTypes');
    };

    return (
        <QuizContainer
            title="I am a..."
            data={customerType}
            handleCardPress={handleCardPress}
        />
    );
};

export default CustomerTypesScreen;
