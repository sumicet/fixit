import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import SmallContent from '../text/SmallContent';
import { PROPERTY_TYPES } from '../../data/Jobs/PropertyTypes';

const PropertyType = props => {
    return (
        <View style={styles.container}>
            <Icon name="home-city" size={18} color={Color.secondaryColor} />
            <SmallContent style={{ color: Color.secondaryColor }}>
                {' '}
                {
                    PROPERTY_TYPES.find(elem => elem.id === props.propertyType)
                        .name
                }
            </SmallContent>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Layout.generalPadding,
    },
});

export default PropertyType;
