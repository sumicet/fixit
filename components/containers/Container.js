import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from '../../constants/Color';

import Layout from '../../constants/Layout';

const Container = props => {
    return (
        <View style={styles.container}>
            <View style={[styles.insideContainer, props.style]}>
                {props.children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.primaryColor
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
