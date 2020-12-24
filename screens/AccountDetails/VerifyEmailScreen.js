import React, { useEffect } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MediumButton from '../../components/buttons/MediumButtom';
import Line from '../../components/common/Line';
import LineDescription from '../../components/common/LineDescription';
import Container from '../../components/containers/Container';
import Header from '../../components/text/Header';
import Color from '../../constants/Color';
import Layout from '../../constants/Layout';
import * as Firebase from '../../config/Firebase';
import {
    changeHasVerifiedEmail,
    setResendEmailTimer,
} from '../../store/actions/auth';
import { CommonActions, StackActions } from '@react-navigation/native';

const VerifyEmailScreen = props => {
    const user = Firebase.auth.currentUser;
    const email = user
        ? props.route.params && props.route.params.email
            ? props.route.params.email
            : user.email
        : useSelector(state => state.auth.email);

    const action = props.route.params && props.route.params.action;
    const dispatch = useDispatch();
    const oldResendEmailTimer = useSelector(
        state => state.auth.resendEmailTimer
    );

    const checkIfEmailHasBeenVerified = async () => {
        await user.reload();
        if (user.emailVerified) {
            dispatch(changeHasVerifiedEmail(true));
            if (action === 'change_email' || action === 'change_password') {
                props.navigation.navigate('BottomTab', {
                    screen: 'Profile',
                });
            } else {
                if (typeof action === 'undefined') {
                    props.navigation.navigate('BottomTab', {
                        screen: 'Home',
                    });
                } else {
                    console.log(
                        'wrong action in verifyemailscreen // navigation'
                    );
                }
            }
        } else {
            console.log('Please verify your email', user.email);
        }
    };

    const handleFinishChangePassword = async () => {
        await user.reload();
        props.navigation.navigate('BottomTab', {
            screen: 'Profile',
        });
    };

    const sendVerificationEmail = () => {
        const timeDiff = Date.now() - oldResendEmailTimer;
        if (oldResendEmailTimer === null || timeDiff >= 60000) {
            if (action === 'change_email' || typeof action === 'undefined') {
                user.sendEmailVerification().catch(error => {
                    throw error;
                });
            } else {
                if (action === 'change_password') {
                    Firebase.auth
                        .sendPasswordResetEmail(email)
                        .catch(error => console.log(error));
                } else {
                    console.log('wrong action in verifyemailscreen');
                }
            }

            dispatch(setResendEmailTimer(Date.now()));
        } else {
            console.log(
                'You can do that again in',
                60 - Math.round(timeDiff / 1000)
            );
        }
    };

    useEffect(() => {
        sendVerificationEmail();
    }, []);

    return (
        <Container style={{ marginTop: 0 }}>
            <LineDescription
                text="We have sent an email to:"
                textStyle={{ fontFamily: 'Asap-Regular', textAlign: 'left' }}
            />
            <Line style={{ flex: 0 }}>
                <View
                    style={{
                        backgroundColor: Color.textField,
                        padding: Layout.generalPadding,
                        paddingHorizontal: Layout.screenHorizontalPadding,
                        borderRadius: Layout.borderRadius,
                    }}
                >
                    <Header
                        style={{
                            color: Color.importantTextOnTertiaryColorBackground,
                        }}
                    >
                        {email}
                    </Header>
                </View>
            </Line>
            <LineDescription
                text="Please verify your email address in order to proceed."
                textStyle={{ fontFamily: 'Asap-Regular', textAlign: 'left' }}
            />
            <Line
                style={{
                    flex: 0,
                    paddingTop: Layout.screenHorizontalPadding,
                    paddingBottom:
                        Layout.screenHorizontalPadding - Layout.generalPadding,
                }}
            >
                <MediumButton
                    text={action === 'change_password' ? 'Finish' : 'Continue'}
                    onPress={() =>
                        user &&
                        (action === 'change_password'
                            ? handleFinishChangePassword
                            : checkIfEmailHasBeenVerified)
                    }
                />
            </Line>
            <Line style={{ flex: 0 }}>
                <MediumButton
                    text="Resend email"
                    onPress={() => user && sendVerificationEmail()}
                    style={{
                        backgroundColor: 'transparent',
                    }}
                />
            </Line>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default VerifyEmailScreen;
