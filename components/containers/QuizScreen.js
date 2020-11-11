import React from 'react';
import { View } from 'react-native';

import Container from './Container';
import Title from '../text/Title';
import Layout from '../../constants/Layout';
import Color from '../../constants/Color';

import NextButton from '../common/NextButton';

const QuizScreen = props => {

    return (
        <Container style={[{ paddingHorizontal: 0 }, props.style]} >
            <View
                style={{
                    paddingHorizontal: Layout.screenHorizontalPadding,
                    marginBottom: Layout.generalMargin,
                    flexDirection: 'row',
                    justifyContent: props.centerTitle ? 'center' : 'flex-start'
                }}
            >
                <Title style={{ color: Color.primaryBrandColor }}>
                    {props.title}
                </Title>

                {props.showNextButton ? (
                    <View
                        style={{
                            alignItems: 'flex-end',
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <NextButton
                            onPress={() => props.onPress()}
                        />
                    </View>
                ) : null}
            </View>
            {props.children}
        </Container>
    );
};

export default QuizScreen;
