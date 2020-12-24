import { CommonActions } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import Authentication from '../../components/authentication/Authentication';
import { logIn } from '../../store/actions/auth';

const LogInScreen = props => {
    const dispatch = useDispatch();
    const action = props.route.params && props.route.params.action;

    const handleOnPress = (email, password) => {
        dispatch(logIn(email, password));aut
    };

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
