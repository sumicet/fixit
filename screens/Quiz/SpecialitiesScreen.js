import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import OccupationCard from '../../components/cards/OccupationCard';
import Container from '../../components/containers/Container';
import Title from '../../components/text/Title';

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

import Layout from '../../constants/Layout';

const SpecialitiesScreen = props => {
    const occupations = [
        { icon: <PlumberIcon />, name: 'Plumber' },
        { icon: <HeatingEngineerIcon />, name: 'Heating Eng.' },
        { icon: <BuilderIcon />, name: 'Builder' },
        { icon: <ElectricianIcon />, name: 'Electrician' },
        { icon: <CarpenterIcon />, name: 'Carpenter' },
        { icon: <PainterDecoratorIcon />, name: 'Painter' },
        { icon: <PlastererIcon />, name: 'Plasterer' },
        { icon: <RooferIcon />, name: 'Roofer' },
        { icon: <HandymanIcon />, name: 'Handyman' },
        { icon: <OtherIcon />, name: 'Other' },
    ];

    const renderOccupations = itemData => {
        return (
            <OccupationCard name={itemData.item.name}>
                {itemData.item.icon}
            </OccupationCard>
        );
    };

    return (
        <Container style={{ paddingHorizontal: 0 }}>
            <View style={{ paddingHorizontal: Layout.screenHorizontalPadding }}>
                <Title>What are you looking for?</Title>
            </View>
            <FlatList
                data={occupations}
                keyExtractor={(item, index) => Math.random()}
                renderItem={renderOccupations}
                numColumns={2}
                horizontal={false}
                style={styles.flatlist}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    flatlist: {
        marginTop: Layout.generalMargin,
        flex: 1,
        paddingHorizontal:
            Layout.screenHorizontalPadding - Layout.generalPadding,
    },
});

export default SpecialitiesScreen;
