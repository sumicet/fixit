import React from 'react';
import { View, StyleSheet } from 'react-native';

import Color from '../../constants/Color';
import Line from '../common/Line';
import Title from '../text/Title';
import Layout from '../../constants/Layout';
import Touchable from '../common/Touchable';
import Header from '../text/Header';
import AlertContainer from './AlertContainer';

const Alert = props => {

    const {
        hide,
        modalVisible,
        titleColor,
        title,
        message,
        onlyShowOneButton,
        cancelButtonColor,
        leftButtonText,
        onPress,
        buttonColor,
        text,
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
            cardStyle={styles.card}
        >
            <Line style={{ paddingTop: Layout.screenHorizontalPadding }}>
                <Title
                    style={{
                        color: titleColor
                            ? titleColor
                            : Color.primaryBrandColor,
                    }}
                >
                    {title}
                </Title>
            </Line>
            <Line>
                <Header
                    style={{
                        color: Color.textOnTertiaryColorBackground,
                        fontFamily: 'Asap-Regular',
                    }}
                >
                    {message}
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
                {onlyShowOneButton ? null : (
                    <Touchable
                        onPress={hide}
                        style={[
                            styles.touchable,
                            {
                                backgroundColor: cancelButtonColor
                                    ? cancelButtonColor
                                    : Color.primaryBrandColor,
                            },
                        ]}
                    >
                        <Header
                            style={{
                                color: Color.importantTextOnTertiaryColorBackground,
                                fontFamily: 'Asap-Regular',
                            }}
                        >
                            {leftButtonText ? leftButtonText : 'Go back'}
                        </Header>
                    </Touchable>
                )}
                <Touchable
                    onPress={onPress}
                    style={[
                        styles.touchable,
                        {
                            backgroundColor: buttonColor
                                ? buttonColor
                                : Color.urgent,
                        },
                    ]}
                >
                    <Header
                        style={{
                            color: Color.importantTextOnTertiaryColorBackground,
                            fontFamily: 'Asap-Regular',
                        }}
                    >
                        {text ? text : 'Yes'}
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
