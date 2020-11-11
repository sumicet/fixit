import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';

const Header = (props) => {

    return (
        <Text {...props} numberOfLines={1} ellipsizeMode='tail' style={[styles.header, props.style]}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    header: {
        fontFamily: 'asap-semibold',
        fontSize: Layout.headerSize,
        color: Color.textColor,
        textAlign: 'left'
    }
})

export default Header;