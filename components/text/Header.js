import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Color from '../../constants/Color';

const Header = (props) => {
    return (
        <Text {...props} style={[styles.header, props.style]}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    header: {
        fontFamily: 'asap-semibold',
        fontSize: 20,
        color: Color.textColor,
        textAlign: 'center'
    }
})

export default Header;