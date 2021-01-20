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
            cardStyle={[
                styles.card,
                {
                    backgroundColor:
                        props.style === WARNING
                            ? Color.warning
                            : props.style === SUCCESS
                            ? Color.success
                            : Color.error,
                },
            ]}
            hasBackdrop={true}
        >
            <Line
                style={{ flex: 0, paddingTop: Layout.screenHorizontalPadding }}
            >
                <Title
                    style={{
                        color: Color.importantTextOnTertiaryColorBackground,
                    }}
                >
                    {title}
                </Title>
            </Line>
            <Line style={{ flex: 0 }}>
                <Header
                    style={{
                        color: Color.importantTextOnTertiaryColorBackground,
                        fontFamily: 'Regular',
                    }}
                >
                    {message}
                </Header>
            </Line>
            <Line
                style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '100%',
                    paddingBottom: Layout.screenHorizontalPadding,
                }}
            >
                <Touchable
                    onPress={hide}
                    style={[
                        styles.touchable,
                        {
                            backgroundColor: Color.importantTextOnTertiaryColorBackground
                        },
                    ]}
                >
                    <Header
                        style={{
                            color: props.style === WARNING
                            ? Color.warning
                            : props.style === SUCCESS
                            ? Color.success
                            : Color.error,
                            //fontFamily: 'Regular',
                        }}
                    >
                        {leftButtonText ? leftButtonText : 'Go back'}
                    </Header>
                </Touchable>

                {!onlyShowOneButton && (
                    <Touchable
                        onPress={onPress}
                        style={[
                            styles.touchable,
                            {
                                backgroundColor: 'transparent'
                            },
                        ]}
                    >
                        <Header
                            style={{
                                color:
                                    Color.importantTextOnTertiaryColorBackground,
                                //fontFamily: 'Regular',
                            }}
                        >
                            {text ? text : 'Yes'}
                        </Header>
                    </Touchable>
                )}
            </Line>
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
        //height: 250,
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
