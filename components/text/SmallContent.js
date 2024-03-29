import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';

const SmallContent = props => {
    return (
        <Text {...props} style={[styles.content, props.style]}>
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    content: {
        fontFamily: 'Regular',
        fontSize: Layout.smallContentSize,
        color: Color.textColor,
    },
});

export default SmallContent;
