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
import { setResendEmailTimer } from '../../store/actions/auth';

const VerifyEmailScreen = props => {
    const email =
        props.route.params && props.route.params.email
            ? props.route.params.email
            : Firebase.auth.currentUser.email;

    const action = props.route.params && props.route.params.action;
    const dispatch = useDispatch();
    const oldResendEmailTimer = useSelector(
        state => state.auth.resendEmailTimer
    );

    const sendVerificationEmail = () => {
        const timeDiff = Date.now() - oldResendEmailTimer;
        if (oldResendEmailTimer === null || timeDiff >= 60000) {
            if (action === 'change_email') {
                Firebase.auth.currentUser
                    .sendEmailVerification()
                    .catch(error => {
                        throw error;
                    });
            } else {
                Firebase.auth
                    .sendPasswordResetEmail(email)
                    .catch(error => console.log(error));
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
                style={{ flex: 0, paddingTop: Layout.screenHorizontalPadding }}
            >
                <MediumButton
                    text="Resend email"
                    onPress={sendVerificationEmail}
                />
            </Line>
        </Container>
    );
};

const styles = StyleSheet.create({});

export default VerifyEmailScreen;
