import React from 'react';
import { StyleSheet } from 'react-native';
import ResetEmailOrPasswordContainer from '../../components/containers/ResetEmailOrPasswordContainer';

const ResetPasswordScreen = props => {
    return (
        <ResetEmailOrPasswordContainer
            title="Reset password"
            text="Please type a new password."
            showConfirmPasswordField={true}
            placeholder="new password"
            onPress={() => {
                props.navigation.navigate('Profile', {
                    screen: 'UserProfile',
                    params: {
                        action: 'password-reset',
                    },
                });
            }}
            buttonText="Finish"
            secureTextEntry={true}
        />
    );
};

const styles = StyleSheet.create({});

export default ResetPasswordScreen;
