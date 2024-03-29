import React from 'react';
import { View, StyleSheet } from 'react-native';
import Color from '../../constants/Color';

import Layout from '../../constants/Layout';
import Header from '../text/Header';

const OccupationCard = props => {
    return (
        <View style={[styles.container, props.style]}>
            {props.children && (
                <View style={styles.iconContainer}>{props.children}</View>
            )}
            <View>
                <Header>{props.name}</Header>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Layout.generalPadding,
        borderRadius: Layout.borderRadius,
        margin: Layout.cardMargin,
    },
    iconContainer: {
        paddingBottom: Layout.generalPadding,
    },
});

export default OccupationCard;
