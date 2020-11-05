import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Color from '../../constants/Color';

const Title = (props) => {
    return (
        <Text {...props} style={[styles.title, props.style]}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'asap-bold',
        fontSize: 30,
        color: Color.textColor,
    }
})

export default Title;