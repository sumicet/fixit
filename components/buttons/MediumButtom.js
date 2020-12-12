import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import Touchable from '../common/Touchable';
import Header from '../text/Header';

const MediumButton = props => {
    return (
        <Touchable
            style={[styles.touchable, props.style]}
            onPress={props.onPress}
            isCard={true}
        >
            <Header style={{ fontFamily: 'Asap-Regular', color: Color.importantTextOnTertiaryColorBackground }}>
                {props.text}
            </Header>
        </Touchable>
    );
};

const styles = StyleSheet.create({
    touchable: {
        flex: 0,
        height: Layout.menuIconSize + 2 * Layout.generalPadding,
        width: '60%',
        backgroundColor: Color.primaryBrandColor,
        padding: Layout.generalPadding,
        borderRadius: Layout.borderRadius,
    },
});

export default MediumButton;
