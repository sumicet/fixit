import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import HouseIcon from '../../../assets/icons/Properties/HouseIcon';
import StoreIcon from '../../../assets/icons/Properties/StoreIcon';
import FactoryIcon from '../../../assets/icons/Properties/FactoryIcon';
import SmallContent from '../../text/SmallContent';
import Layout from '../../../constants/Layout';
import Color from '../../../constants/Color';

const Occupations = props => {
    const occupations = [];

    occupations.push(<HouseIcon key={1} />);
    occupations.push(<StoreIcon key={2} />);
    occupations.push(<FactoryIcon key={3} />);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {occupations.map(value => {
                    return <View style={{ paddingRight: 3 }}>{value}</View>; // TODO delete padding for the last one
                })}
            </View>
            <SmallContent style={{ color: Color.secondaryColor }}>
                {' '}
                •
                {' '}
            </SmallContent>
            <SmallContent style={{ color: Color.secondaryColor, fontFamily:'asap-semibold' }}>
                Plumber
            </SmallContent>
            <SmallContent style={{ color: Color.secondaryColor }}>
                {' '}(+2 more) •{' '}
            </SmallContent>
            <Icon
                name="location-pin"
                size={Layout.occupationIconSize}
                color={Color.secondaryColor}
            />
            <SmallContent style={{ color: Color.secondaryColor }}>
                25km
            </SmallContent>
        </View>
    );
};

const styles = StyleSheet.create({});

export default Occupations;
