import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Firebase from '../../config/Firebase';

import Authentication from '../../components/authentication/Authentication';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/actions/auth';

const SignUpScreen = props => {

    const dispatch = useDispatch();

    const handleOnPress = (email, password) => {
        try {
            props.navigation.navigate('SelectUserType', {
                email: email,
                password: password,
            });
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
        />
    );
};

const styles = StyleSheet.create({});

export default SignUpScreen;
