import React from 'react';
import { useDispatch } from 'react-redux';

import QuizContainer from '../../components/quiz/QuizContainer';
import { PROPERTY_TYPES } from '../../data/Jobs/PropertyTypes';
import { setPropertyType } from '../../store/actions/quiz';
import CardData from '../../models/Quiz/CardData';
import HouseIcon from '../../assets/icons/Properties/HouseIcon';
import UniversityIcon from '../../assets/icons/Properties/UniversityIcon';
import FactoryIcon from '../../assets/icons/Properties/FactoryIcon';


const PropertyTypesScreen = props => {

    var propertyType = [];

    const icons = [<HouseIcon />, <UniversityIcon />, <FactoryIcon />];

    const dispatch = useDispatch();

    var i;
    for (i = 1; i <= PROPERTY_TYPES.length; i++) {
        const item = new CardData(
            i,
            icons[i-1],
            PROPERTY_TYPES.find(elem => elem.id === i).name
        );
        propertyType.push(item);
    }

    const handleCardPress = id => {
        dispatch(setPropertyType(id));
        //props.navigation.navigate('PropertyTypes');
    };

    return (
        <QuizContainer
            title="What type of property is the job for?"
            data={propertyType}
            handleCardPress={handleCardPress}
        />
    );
};

export default PropertyTypesScreen;
