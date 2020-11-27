import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { StatusBar, StatusBarAnimation } from 'expo-status-bar';

import Color from '../../constants/Color';
import Layout from '../../constants/Layout';

const Container = props => {
    const barStyle = useSelector(state => state.ui.barStyle);

    return (
        <View style={styles.container}>
            <View style={[styles.insideContainer, props.style]}>
                {props.children}
            </View>
            <StatusBar style={barStyle} StatusBarAnimation='fade' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.primaryColor,
    },
    insideContainer: {
        flex: 1,
        backgroundColor: Color.primaryColor,
        marginTop: Layout.screenTopMargin,
        paddingTop: Layout.screenVerticalPadding,
        paddingHorizontal: Layout.screenHorizontalPadding,
    },
});

export default Container;
