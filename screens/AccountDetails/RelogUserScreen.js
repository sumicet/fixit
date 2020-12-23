import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as firebase from 'firebase';

import AuthLine from '../../components/authentication/AuthLine';
import * as Firebase from '../../config/Firebase';
import Confirm from '../../components/authentication/Confirm';
import { changeHasVerifiedEmail } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';

const RelogUserScreen = props => {
    const [password, setPassword] = useState();
    const action = props.route.params && props.route.params.action;
    const dispatch = useDispatch();

    return (
        <Confirm
            text="Please confirm your password to continue."
            onPress={() => {
                const user = Firebase.auth.currentUser;
                const credential = firebase.auth.EmailAuthProvider.credential(
                    user.email,
                    password
                );
                user.reauthenticateWithCredential(credential)
                    .then(() => {
                        if (action === 'change_email') {
                            props.navigation.navigate('InputNewEmail', {
                                action,
                                password
                            });
                        } else {
                            props.navigation.navigate('VerifyEmail', {
                                action: action,
                                email: user.email
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }}
        >
            <AuthLine
                iconName="key-variant"
                value={password}
                onChange={input => setPassword(input)}
                placeholder="**********"
                secureTextEntry={true}
            />
        </Confirm>
    );
};

const styles = StyleSheet.create({});

export default RelogUserScreen;
