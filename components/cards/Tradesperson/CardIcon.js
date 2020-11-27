import React from 'react';
import { View, StyleSheet } from 'react-native';

import SmallContent from '../../text/SmallContent';
import Color from '../../../constants/Color';

const CardIcon = props => {
    return (
        <View style={[styles.container, props.style]}>
            {props.children}
            <SmallContent style={{ color: Color.secondaryColor }}>
                {' '}
                {props.text}
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

export default CardIcon;
