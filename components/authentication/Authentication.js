import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import * as yup from 'yup';

import Logo from '../../assets/icons/Logo/Logo';
import MediumButton from '../../components/buttons/MediumButtom';
import Line from '../../components/common/Line';
import Container from '../../components/containers/Container';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import Header from '../../components/text/Header';
import Touchable from '../../components/common/Touchable';
import AuthLine from './AuthLine';
import SmallContent from '../text/SmallContent';
import { useIsFocused } from '@react-navigation/native';

const Authentication = props => {
    const {
        defaultEmail,
        defaultPassword,
        buttonText,
        text,
        onPress,
        onTextPress,
    } = props;

    const [user, setUser] = useState({
        email: null,
        password: null,
    });

    const [email, setEmail] = useState(defaultEmail);
    const [password, setPassword] = useState(defaultPassword);
    const [info, setInfo] = useState({
        color: Color.tertiaryBrandColor,
        text: null,
    });
    const isFocused = useIsFocused();

    useEffect(() => {
        if (defaultEmail && defaultPassword && isFocused)
            setInfo({
                color: Color.error,
                text: 'Please validate your email address.',
            });
    }, [isFocused]);

    let schema = yup.object().shape({
        email: yup
            .string()
            .email('Enter a valid email address.')
            .required('Email address is required.'),
        password: yup
            .string()
            .min(
                8,
                ({ min }) => `The password must be at least 8 characters long.`
            )
            .required('Password is required.'),
    });

    const validateInput = () => {
        onPress(email, password);
    };

    return (
        <Container
            style={{
                backgroundColor: Color.secondaryBrandColor,
                marginTop: 0,
                paddingTop: 0,
                paddingHorizontal: 0,
            }}
        >
            {/* <KeyboardAvoidingView style={{ flex: 1 }}> */}
            <ScrollView
                //bounces={false}
                style={{
                    paddingHorizontal: Layout.screenHorizontalPadding,
                }}
                contentContainerStyle={{
                    justifyContent: 'center',
                    flex: 1,
                }}
            >
                <Line
                    style={{
                        flex: 0,
                    }}
                >
                    <Logo height={60} width={60} />
                </Line>

                <Line
                    style={{
                        flex: 0,
                    }}
                >
                    <SmallContent style={{ color: info.color }}>
                        {info.text}
                    </SmallContent>
                </Line>

                <AuthLine
                    iconName="email"
                    value={email}
                    onChange={input => setEmail(input)}
                    placeholder="example@gmail.com"
                    secureTextEntry={false}
                />
                <AuthLine
                    iconName="key-variant"
                    value={password}
                    onChange={input => setPassword(input)}
                    placeholder="**********"
                    secureTextEntry={true}
                />
                <Line
                    style={{
                        flex: 0,
                        paddingTop: Layout.screenHorizontalPadding,
                    }}
                >
                    <MediumButton onPress={validateInput} text={buttonText} />
                </Line>
                <Line
                    style={{
                        flex: 0,
                    }}
                >
                    <Touchable onPress={onTextPress} style={{ flex: 0 }}>
                        <Header
                            style={{
                                fontFamily: 'Asap-Regular',
                                color:
                                    Color.importantTextOnTertiaryColorBackground,
                            }}
                        >
                            {text}
                        </Header>
                    </Touchable>
                </Line>
            </ScrollView>
            {/* </KeyboardAvoidingView> */}
        </Container>
    );
};

const styles = StyleSheet.create({});

export default Authentication;
