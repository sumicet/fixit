import { CommonActions } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Authentication from '../../components/authentication/Authentication';
import Loading from '../../components/loading/Loading';
import { ERROR } from '../../constants/Actions';
import { logIn } from '../../store/actions/auth';
import { setInAppNotification } from '../../store/actions/ui';

const LogInScreen = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState();

    const handleOnPress = (email, password) => {
        console.log(email, password)
        dispatch(logIn(email, password))
            .then(() => {
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            {
                                name: 'BottomTab',
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
                    case 'auth/user-disabled':
                        dispatch(
                            setInAppNotification(
                                'User disabled',
                                'This user has been disabled.',
                                ERROR
                            )
                        );
                        return;
                    case 'auth/user-not-found':
                        dispatch(
                            setInAppNotification(
                                'User not found',
                                "We couldn't find an account associated with this email address.",
                                ERROR
                            )
                        );
                        return;
                    case 'auth/wrong-password':
                        dispatch(
                            setInAppNotification(
                                'Wrong password',
                                'It looks like the password does not match with the selected email address.',
                                ERROR
                            )
                        );
                        return;
                    default:
                        dispatch(
                            setInAppNotification(
                                'Error!',
                                'A problem occured.',
                                ERROR
                            )
                        );
                        return;
                }
            })
    };

    if(isLoading) {
        return <Loading />
    }

    return (
        <View style={{ flex: 1 }}>
            <Authentication
                buttonText="Log In"
                onTextPress={() => {
                    props.navigation.navigate('SignUp');
                }}
                text="Create an account."
                onPress={handleOnPress}
                defaultEmail={props.route.params && props.route.params.email}
                defaultPassword={
                    props.route.params && props.route.params.password
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default LogInScreen;
