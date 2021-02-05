import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
import LineDescription from '../common/LineDescription';
import Grid from '../layout/Grid';
import CustomRadioButton from '../common/CustomRadioButton';
import { View } from 'react-native';
import Waves from '../../assets/icons/Background/Waves';
import { Keyboard } from 'react-native';
import { Dimensions } from 'react-native';
import { StatusBar } from 'react-native';

const Authentication = props => {
    const {
        defaultEmail,
        defaultPassword,
        buttonText,
        text,
        onPress,
        onTextPress,
    } = props;

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

    const handleToggleCheck = (index, checked, setChecked) => {
        const updatedChecked = [...checked];
        if (updatedChecked) {
            var i;
            for (i = 0; i < updatedChecked.length; i++) {
                if (i !== index) {
                    updatedChecked[i] = false;
                } else {
                    updatedChecked[i] = true;
                }
            }
        }
        setChecked(updatedChecked);
    };

    const [showWaves, setShowWaves] = useState(true);

    useEffect(() => {
        const event1 = Keyboard.addListener('keyboardDidShow', () => {
            setShowWaves(false);
        });

        const event2 = Keyboard.addListener('keyboardDidHide', () => {
            setShowWaves(true);
        });

        return () => {
            event1.remove();
            event2.remove();
        };
    }, []);

    return (
        <Container
            style={{
                backgroundColor: Color.secondaryBrandColor,
                marginTop: 0,
                paddingTop: 0,
                paddingHorizontal: 0,
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    top: Dimensions.get('window').height - 300 - StatusBar.currentHeight,
                    height: 300,
                }}
            >
                <Waves />
            </View>

            <ScrollView
                keyboardDismissMode="none"
                keyboardShouldPersistTaps="always"
                style={{
                    paddingHorizontal: Layout.screenHorizontalPadding,
                }}
                contentContainerStyle={{
                    justifyContent: 'center',
                    flexGrow: 1,
                    //flex: 1,
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
                {!props.hideTextFields && props.action === 'signup' && (
                    <AuthLine
                        iconName="account"
                        value={props.name}
                        onChange={input => props.setName(input)}
                        placeholder="Full name"
                        secureTextEntry={false}
                    />
                )}
                {!props.hideTextFields && (
                    <AuthLine
                        iconName="email"
                        value={email}
                        onChange={input => setEmail(input)}
                        placeholder="example@gmail.com"
                        secureTextEntry={false}
                    />
                )}
                {!props.hideTextFields && (
                    <AuthLine
                        iconName="key-variant"
                        value={password}
                        onChange={input => setPassword(input)}
                        placeholder="**********"
                        secureTextEntry={true}
                    />
                )}
                {props.hideTextFields && (
                    <LineDescription
                        textStyle={{ textAlign: 'center' }}
                        text={`We have sent an email to ${email}. Please verify your account to continue.`}
                    />
                )}
                {props.action === 'signup' && (
                    <Line
                        style={{
                            flex: 0,
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                paddingRight: Layout.screenHorizontalPadding,
                            }}
                        >
                            <View
                                style={{
                                    height: Layout.menuIconSize,
                                    width: Layout.menuIconSize,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Icon
                                    name="account-question"
                                    size={Layout.menuIconSize}
                                    color={
                                        Color.importantTextOnTertiaryColorBackground
                                    }
                                />
                            </View>
                        </View>

                        <View style={{ flex: 1 }}>
                            <Grid
                                data={[
                                    { name: 'Customer', id: 0 },
                                    { name: 'Tradesperson', id: 1 },
                                ]}
                                checked={props.accountTypeChecked}
                                onToggleCheck={index =>
                                    handleToggleCheck(
                                        index,
                                        props.accountTypeChecked,
                                        props.setAccountTypeChecked
                                    )
                                }
                                RenderItemComponent={CustomRadioButton}
                                uncheckedColor={
                                    Color.importantTextOnTertiaryColorBackground
                                }
                            />
                        </View>
                    </Line>
                )}
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
                                fontFamily: 'Regular',
                                color:
                                    Color.importantTextOnTertiaryColorBackground,
                            }}
                        >
                            {text}
                        </Header>
                    </Touchable>
                </Line>
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default Authentication;
