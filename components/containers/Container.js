import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from '../../constants/Color';

import Layout from '../../constants/Layout';
import BottomMenu from '../Menu/BottomMenu';

const Container = props => {
    return (
        <View
            style={[styles.container, props.style]}
        >
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.primaryColor,
        paddingTop: Layout.screenVerticalPadding,
        paddingHorizontal: Layout.screenHorizontalPadding,
    }
})

export default Container;
