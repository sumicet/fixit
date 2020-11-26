import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SmallContent from '../../text/SmallContent';
import Layout from '../../../constants/Layout';
import Color from '../../../constants/Color';
import HouseIcon from '../../../assets/icons/Properties/HouseIcon';

const Residential = props => {
    return (
        <View style={[styles.container, props.style]}>
            <HouseIcon />
            <SmallContent style={{ color: Color.secondaryColor }}>
                {' '}
                residential work
            </SmallContent>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Residential;
