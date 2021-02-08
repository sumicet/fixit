import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import AuthLine from '../../components/authentication/AuthLine';
import Confirm from '../../components/authentication/Confirm';
import { useDispatch } from 'react-redux';
import { changeEmail } from '../../store/actions/auth';
import { CommonActions } from '@react-navigation/native';
import { setInAppNotification } from '../../store/actions/ui';
import { ERROR, SUCCESS } from '../../constants/Actions';

const InputNewEmailScreen = props => {
    const [email, setEmail] = useState();
    const action = props.route.params && props.route.params.action;
    const password = props.route.params && props.route.params.password;
    const dispatch = useDispatch();

    return (
        <Confirm
            text="You can select a new email address."
            onPress={() => {
                dispatch(changeEmail(email, password))
                    .then(() => {
                        props.navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [
                                    {
                                        name: 'VerifyEmail',
                                        params: {
                                            email,
                                            action,
                                            message:
                                                'This change can be reverted by following the instructions sent to your old email address.',
                                        },
                                    },
                                ],
                            })
                        );
                    })
                    .catch(error => {
                        switch (error.code) {
                            case 'auth/argument-error':
                                dispatch(
                                    setInAppNotification(
                                        'Empty fields',
                                        'Please fill all the required fields.',
                                        ERROR
                                    )
                                );
                                return;
                            case 'auth/too-many-requests':
                                dispatch(
                                    setInAppNotification(
                                        'Too many requests!',
                                        'We have blocked all requests from this device due to unusual activity. Try again later.',
                                        ERROR
                                    )
                                );
                                return;
                            case 'auth/invalid-email':
                                dispatch(
                                    setInAppNotification(
                                        'Invalid email',
                                        'Please enter your email address in the following format: yourname@example.com',
                                        ERROR
                                    )
                                );
                                return;
                            case 'auth/email-already-in-use':
                                dispatch(
                                    setInAppNotification(
                                        'Email already in use',
                                        'This email address is already taken. Please select another one.',
                                        ERROR
                                    )
                                );
                                return;
                            case 'auth/weak-password':
                                dispatch(
                                    setInAppNotification(
                                        'Weak password',
                                        'Please select a stronger password.',
                                        ERROR
                                    )
                                );
                                return;
                            default:
                                dispatch(
                                    setInAppNotification(
                                        'Error!',
                                        error.code,
                                        ERROR
                                    )
                                );
                                return;
                        }
                    });
            }}
        >
            <AuthLine
                iconName="email"
                value={email}
                onChange={input => setEmail(input)}
                placeholder="example@gmail.com"
                secureTextEntry={false}
            />
        </Confirm>
    );
};

const styles = StyleSheet.create({});

export default InputNewEmailScreen;
