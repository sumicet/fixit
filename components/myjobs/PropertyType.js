import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import SmallContent from '../text/SmallContent';

const PropertyType = props => {
    return (
        <View style={styles.container}>
            <Icon name="home-city" size={18} color={Color.secondaryColor} />
            <SmallContent style={{ color: Color.secondaryColor }}>
                {' '}
                residential
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
