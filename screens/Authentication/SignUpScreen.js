import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import Authentication from '../../components/authentication/Authentication';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/actions/auth';
import { ERROR } from '../../constants/Actions';
import { setInAppNotification } from '../../store/actions/ui';
import { CommonActions } from '@react-navigation/native';

const SignUpScreen = props => {
    const dispatch = useDispatch();

    const [accountTypeChecked, setAccountTypeChecked] = useState([
        false,
        false,
    ]);
    const [name, setName] = useState();

    const handleOnPress = (email, password) => {
        try {
            if (accountTypeChecked === [false, false]) {
                dispatch(
                    setInAppNotification(
                        'Empty user type',
                        'You must select a user type in order to create an account.',
                        ERROR
                    )
                );
            } else {
                const userType =
                    accountTypeChecked[0] === true
                        ? 'customer'
                        : 'tradesperson';
                dispatch(signUp(email, name, password, userType))
                    .then(() => {
                        props.navigation.dispatch(
                            CommonActions.reset({
                                index: 1,
                                routes: [
                                    {
                                        name: 'VerifyEmail',
                                        params: {
                                            action: 'signup',
                                            email,
                                            userType,
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
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Authentication
            buttonText="Sign Up"
            onTextPress={() => {
                props.navigation.navigate('LogIn');
            }}
            text="I already have an account."
            onPress={handleOnPress}
            action="signup"
            accountTypeChecked={accountTypeChecked}
            setAccountTypeChecked={setAccountTypeChecked}
            name={name}
            setName={setName}
        />
    );
};

const styles = StyleSheet.create({});

export default SignUpScreen;
