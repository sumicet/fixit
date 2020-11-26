import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SmallContent from '../../text/SmallContent';
import Layout from '../../../constants/Layout';
import Color from '../../../constants/Color';
import FactoryIcon from '../../../assets/icons/Properties/FactoryIcon';

const Industrial = props => {
    return (
        <View style={[styles.container, props.style]}>
            <FactoryIcon />
            <SmallContent style={{ color: Color.secondaryColor }}>
                {' '}
                industrial work
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

export default Industrial;
