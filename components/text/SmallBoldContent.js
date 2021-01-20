import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';

const SmallBoldContent = (props) => {
    return (
        <Text {...props} style={[styles.content, props.style]}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    content: {
        fontFamily: 'SemiBold',
        fontSize: Layout.smallContentSize,
        color: Color.textColor,
    }
})

export default SmallBoldContent;