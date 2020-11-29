import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import Color from '../../constants/Color';
import Line from '../common/Line';
import Title from '../text/Title';
import Layout from '../../constants/Layout';
import Touchable from '../common/Touchable';
import Header from '../text/Header';
import AlertContainer from './AlertContainer';

const Alert = props => {
    return (
        <AlertContainer
            animationIn="pulse"
            animationOut="zoomOut"
            animationInTiming={1000}
            animationOutTiming={500}
            onBackdropPress={props.hide}
            modalVisible={props.modalVisible}
            containerStyle={styles.container}
            cardStyle={styles.card}
        >
            <Line style={{ paddingTop: Layout.screenHorizontalPadding }}>
                <Title style={{ color: props.titleColor ? props.titleColor : Color.primaryBrandColor }}>
                    {props.title}
                </Title>
            </Line>
            <Line>
                <Header
                    style={{
                        color: Color.primaryColor,
                        fontFamily: 'Asap-Regular',
                    }}
                >
                    {props.message}
                </Header>
            </Line>
            <Line
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '100%',
                    paddingBottom: Layout.screenHorizontalPadding,
                }}
            >
                <Touchable
                    onPress={props.hide}
                    style={[
                        styles.touchable,
                        { backgroundColor: Color.primaryBrandColor },
                    ]}
                >
                    <Header
                        style={{
                            color: Color.primaryColor,
                            fontFamily: 'Asap-Regular',
                        }}
                    >
                        Go back
                    </Header>
                </Touchable>
                <Touchable
                    onPress={props.onPress}
                    style={[
                        styles.touchable,
                        { backgroundColor: Color.urgent },
                    ]}
                >
                    <Header
                        style={{
                            color: Color.primaryColor,
                            fontFamily: 'Asap-Regular',
                        }}
                    >
                        Yes
                    </Header>
                </Touchable>
            </Line>
        </AlertContainer>
    );
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    card: {
        height: 250,
        width: 350,
        backgroundColor: Color.tertiaryBrandColor,
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
