import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Firebase from '../../config/Firebase';

import Authentication from '../../components/authentication/Authentication';

const SignUpScreen = props => {
    const handleOnPress = (email, password) => {
        Firebase.auth
            .createUserWithEmailAndPassword(email, password)
            .then(userData => {
                userData.user
                    .sendEmailVerification()
                    .then(() => {
                        props.navigation.navigate('LogIn', {
                            email: email,
                            password: password,
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <Authentication
            buttonText="Sign Up"
            onTextPress={() => {
                props.navigation.navigate('LogIn');
            }}
            text="I already have an account."
            onPress={handleOnPress}
        />
    );
};

const styles = StyleSheet.create({});

export default SignUpScreen;
