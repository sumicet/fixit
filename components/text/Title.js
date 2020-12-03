import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';

const Title = (props) => {
    return (
        <Text {...props} style={[styles.title, props.style]}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Asap-Bold',
        fontSize: Layout.titleSize,
        color: Color.textColor,
    }
})

export default Title;