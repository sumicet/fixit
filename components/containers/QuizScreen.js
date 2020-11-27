import React, { useState } from 'react';
import { View } from 'react-native';

import Container from './Container';
import Title from '../text/Title';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';

import NextButton from '../common/NextButton';

const QuizScreen = props => {
    const [
        rightOfTitleComponentWidth,
        setRightOfTitleComponentWidth,
    ] = useState(0);

    return (
        <Container style={[{ paddingHorizontal: 0 }, props.style]}>
            <View
                style={{
                    paddingHorizontal: Layout.screenHorizontalPadding,
                    marginBottom: Layout.generalMargin,
                    flexDirection: 'row',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        paddingLeft: rightOfTitleComponentWidth,
                        justifyContent: props.centerTitle
                            ? 'center'
                            : 'flex-start',
                    }}
                >
                    <Title
                        style={[
                            props.titleColor
                                ? { color: props.titleColor }
                                : { color: Color.primaryBrandColor }, {textAlign: props.centerTitle ? 'center' : 'left'}]
                        }
                    >
                        {props.title}
                    </Title>
                </View>
                <View
                    style={{ alignSelf: 'flex-end' }}
                    onLayout={event => {
                        setRightOfTitleComponentWidth(
                            event.nativeEvent.layout.width
                        );
                    }}
                >
                    {props.rightOfTitleComponent}
                </View>

                {props.showNextButton ? (
                    <View
                        style={{
                            alignItems: 'flex-end',
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <NextButton onPress={() => props.onPress()} />
                    </View>
                ) : null}
            </View>
            {props.children}
        </Container>
    );
};

export default QuizScreen;
