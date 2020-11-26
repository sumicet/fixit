import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import SmallContent from '../../text/SmallContent';
import Layout from '../../../constants/Layout';
import Color from '../../../constants/Color';
import StoreIcon from '../../../assets/icons/Properties/StoreIcon';

const Commercial = props => {
    return (
        <View style={[styles.container, props.style]}>
            <StoreIcon />
            <SmallContent style={{ color: Color.secondaryColor }}>
                {' '}
                commercial work
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

export default Commercial;
