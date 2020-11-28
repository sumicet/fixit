import React from 'react';
import { useDispatch } from 'react-redux';

import QuizContainer from '../../components/quiz/QuizContainer';
import { PROPERTY_TYPES } from '../../data/Jobs/PropertyTypes';
import { setPropertyType } from '../../store/actions/quiz';
import CardData from '../../models/Quiz/CardData';


const PropertyTypesScreen = props => {

    var propertyType = [];

    const dispatch = useDispatch();

    var i;
    for (i = 1; i <= PROPERTY_TYPES.length; i++) {
        const item = new CardData(
            i,
            null,
            PROPERTY_TYPES.find(elem => elem.id === i).name
        );
        propertyType.push(item);
    }
    propertyType.push(new CardData(null, null, null));

    const handleCardPress = id => {
        if(id) {
            dispatch(setPropertyType(id));
            props.navigation.navigate('JobAddress', {
                action: 'edit'
            });
        }
    };

    const handleNextPress = id => {
        props.navigation.navigate('JobAddress', {
            action: 'edit'
        });
    }

    return (
        <QuizContainer
            title="What type of property is the job for?"
            data={propertyType}
            handleCardPress={handleCardPress}
            showNextButton={
                props.route.params && props.route.params.action === 'edit' ? true : false
            }
            onPress={handleNextPress}
            routeName={props.route.name}
        />
    );
};

export default PropertyTypesScreen;
