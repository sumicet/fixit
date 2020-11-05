import React from 'react';
import { useDispatch } from 'react-redux';

import ElectricianIcon from '../../assets/icons/Occupations/ElectricianIcon';
import PlumberIcon from '../../assets/icons/Occupations/PlumberIcon';
import PainterDecoratorIcon from '../../assets/icons/Occupations/PainterDecoratorIcon';
import BuilderIcon from '../../assets/icons/Occupations/BuilderIcon';
import HeatingEngineerIcon from '../../assets/icons/Occupations/HeatingEngineerIcon';
import PlastererIcon from '../../assets/icons/Occupations/PlastererIcon';
import CarpenterIcon from '../../assets/icons/Occupations/CarpenterIcon';
import RooferIcon from '../../assets/icons/Occupations/RooferIcon';
import OtherIcon from '../../assets/icons/Occupations/OtherIcon';
import HandymanIcon from '../../assets/icons/Occupations/HandymanIcon';
import { OCCUPATIONS } from '../../data/Jobs/Occupations';
import QuizContainer from '../../components/quiz/QuizContainer';
import { setOccupation } from '../../store/actions/quiz';

const OccupationsScreen = props => {
    const occupations = [
        {
            id: 8,
            icon: <PlumberIcon />,
            name: OCCUPATIONS.find(elem => elem.id === 8).name,
        },
        {
            id: 5,
            icon: <HeatingEngineerIcon />,
            name: OCCUPATIONS.find(elem => elem.id === 5).name,
        },
        {
            id: 1,
            icon: <BuilderIcon />,
            name: OCCUPATIONS.find(elem => elem.id === 1).name,
        },
        {
            id: 3,
            icon: <ElectricianIcon />,
            name: OCCUPATIONS.find(elem => elem.id === 3).name,
        },
        {
            id: 2,
            icon: <CarpenterIcon />,
            name: OCCUPATIONS.find(elem => elem.id === 2).name,
        },
        {
            id: 6,
            icon: <PainterDecoratorIcon />,
            name: OCCUPATIONS.find(elem => elem.id === 6).name,
        },
        {
            id: 7,
            icon: <PlastererIcon />,
            name: OCCUPATIONS.find(elem => elem.id === 7).name,
        },
        {
            id: 9,
            icon: <RooferIcon />,
            name: OCCUPATIONS.find(elem => elem.id === 9).name,
        },
        {
            id: 4,
            icon: <HandymanIcon />,
            name: OCCUPATIONS.find(elem => elem.id === 4).name,
        },
        {
            id: 10,
            icon: <OtherIcon />,
            name: 'Other',
        },
    ];

    const dispatch = useDispatch();

    const handleCardPress = id => {
        dispatch(setOccupation(id));
        props.navigation.navigate('WorkTypes');
    };

    return (
        <QuizContainer
            title="What are you looking for?"
            data={occupations}
            handleCardPress={handleCardPress}
        />
    );
};

export default OccupationsScreen;
