import React from 'react';
import { View, StyleSheet } from 'react-native';

import Layout from '../../constants/Layout';
import Color from '../../constants/Color';
import ScrollableContainer from './ScrollableContainer';

const SectionedContainer = props => {

    return (
        <ScrollableContainer style={{paddingHorizontal: 0}}
            backgroundColor={Color.tertiaryBrandColor}
            rightOfTitleComponent={props.rightOfTitleComponent}
        >
            <View style={{ backgroundColor: Color.textField }}>
                <View style={styles.topContainer}>{props.topComponent}</View>
            </View>
            <View style={styles.midContainer}>{props.midComponent}</View>
            <View style={styles.bottomContainer}>{props.bottomComponent}</View>
        </ScrollableContainer>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: Color.tertiaryBrandColor,
        paddingHorizontal: Layout.screenHorizontalPadding,
        borderBottomLeftRadius: Layout.borderRadius,
        borderBottomRightRadius: Layout.borderRadius,
    },
    midContainer: {
        paddingTop: Layout.screenHorizontalPadding,
        paddingHorizontal: Layout.screenHorizontalPadding,
        width: '100%',
        borderBottomLeftRadius: Layout.borderRadius,
        borderBottomRightRadius: Layout.borderRadius,
        backgroundColor: Color.textField,
        paddingBottom: Layout.screenHorizontalPadding - Layout.generalPadding,
    },
    bottomContainer: {
        paddingTop: Layout.screenHorizontalPadding,
        paddingHorizontal: Layout.screenHorizontalPadding,
        width: '100%',
    },
});

export default SectionedContainer;
