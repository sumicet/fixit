import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import AuthLine from '../../components/authentication/AuthLine';
import Confirm from '../../components/authentication/Confirm';
import { useDispatch } from 'react-redux';
import { changeEmail } from '../../store/actions/auth';
import { CommonActions } from '@react-navigation/native';

const InputNewEmailScreen = props => {
    const [email, setEmail] = useState();
    const action = props.route.params && props.route.params.action;
    const password = props.route.params && props.route.params.password;
    const dispatch = useDispatch();

    return (
        <Confirm
            text="You can select a new email address."
            onPress={() => {
                dispatch(changeEmail(email, password)).then(() => {
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
