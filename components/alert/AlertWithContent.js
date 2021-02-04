import React from 'react';
import { View, StyleSheet } from 'react-native';

import Color from '../../constants/Color';
import Line from '../common/Line';
import Title from '../text/Title';
import Layout from '../../constants/Layout';
import Touchable from '../common/Touchable';
import Header from '../text/Header';
import AlertContainer from './AlertContainer';
import { SUCCESS, WARNING } from '../../constants/Actions';

const Alert = props => {
    const {
        hide,
        modalVisible,
        Content
    } = props;

    return (
        <AlertContainer
            animationIn="pulse"
            animationOut="zoomOut"
            animationInTiming={1000}
            animationOutTiming={500}
            onBackdropPress={hide}
            modalVisible={modalVisible}
            containerStyle={styles.container}
            cardStyle={[styles.card, props.style]}
            hasBackdrop={true}
        >
            <Content />
        </AlertContainer>
    );
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    card: {
        flex: 0,
        paddingHorizontal: Layout.generalMargin,
    },
    touchable: {
        flex: 0,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Layout.generalPadding,
        borderRadius: Layout.borderRadius,
    },
});

export default Alert;
